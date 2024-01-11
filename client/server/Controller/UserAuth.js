const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../Utils/jwt");
const sendEmail = require("../Utils/SendEmail");
const Admin = require("../Model/Admin");
const DeleteUser = require("../Model/DeleteRequest");
const UserForm = require("../Model/UserForm");
const deleteFileByURL = require("../Utils/deleteS3");
const HttpStatus = {
  OK: 200,
  INVALID: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};
const StatusMessage = {
  INVALID_CREDENTIALS: "Invalid credentials.",
  INVALID_EMAIL_PASSWORD: "Please provide email and password.",
  USER_NOT_FOUND: "User not found.",
  SERVER_ERROR: "Server error.",
  MISSING_DATA: "Please provide all necessary user details.",
  DUPLICATE_DATA: "Data already exists.",
  DUPLICATE_EMAIL: "Email already exists.",
  DUPLICATE_CONTACT: "Contact number already exists.",
  USER_DELETED: "Deleted successfully.",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  USER_UPDATED: "User updated successfully.",
  MISSING_PAGE_PARAMS: "Please provide page number and limit.",
  SAVED_SUCC: "Saved Successfully!",
  NOT_FOUND: "Data not found.",
};

exports.verifyUser = async (req, res) => {
  // console.log(req.params);
  const { token } = req.params;
  // console.log(token);
  try {
    if (!verifyToken(token)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        error: StatusMessage.UNAUTHORIZED_ACCESS, // Include the redirect path in the response
      });
    } else {
      const decodedData = await jwt.verify(token, process.env.jwtKey);
      const LoggedUser = await User.findOne({
        email: decodedData?.email,
      }).select("-password -activeToken");
      return res.status(HttpStatus.OK).json({
        data: LoggedUser,
        message: "Verification successful",
      });
    }
    // If verification succeeds, proceed with other actions or return success
    // For example:
    // return res.status(HttpStatus.OK).json({ message: 'Verification successful' });
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.SERVER_ERROR).json({
      error: StatusMessage.SERVER_ERROR,
    });
  }
};
exports.addUser = async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;

    if (!name || !contact || !email || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.MISSING_DATA);
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_EMAIL);
    }

    const existingUserByContact = await User.findOne({ contact });
    if (existingUserByContact) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_CONTACT);
    }
    //////admin check
    const existingAdminByEmail = await Admin.findOne({ email });
    if (existingAdminByEmail) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_EMAIL);
    }
    // const existingAdminByContact = await Admin.findOne({ contact });
    // if (existingAdminByContact) {
    //   return res
    //     .status(HttpStatus.BAD_REQUEST)
    //     .json(StatusMessage.DUPLICATE_CONTACT);
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      contact,
      email,
      password: hashedPassword,
    });

    const result = await userData.save();

    console.log(result); // Log the result for debugging, avoid exposing in production

    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    console.error(error); // Log the error for debugging, avoid exposing in production
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_EMAIL);
    }
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.contact === 1
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_CONTACT);
    }
    return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { contact, email, password } = req.body;

    if (!(email || contact) || !password) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.INVALID_EMAIL_PASSWORD);
    }

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ contact });
    }

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(StatusMessage.USER_NOT_FOUND);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const token = generateToken({ email: user.email });

      await User.findByIdAndUpdate(
        { _id: user._id?.toString() },
        { activeToken: token },
        { new: true }
      );
      return res.status(HttpStatus.OK).json({
        message: `Welcome ${user.email}`,
        token: token,
        userID: user._id,
      });
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(StatusMessage.INVALID_CREDENTIALS);
    }
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
  }
};
exports.logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    }
    const decodedData = jwt.verify(token, process.env.jwtKey);
    const userData = await User.findOne({ email: decodedData?.email });
    if (userData.activeToken && userData.activeToken === token) {
      const user = await User.findOneAndUpdate(
        { email: decodedData.email, activeToken: token },
        { $unset: { activeToken: "" } }, // Unset the token
        { new: true }
      );
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid session or token, please login again" });
      }
      return res.status(HttpStatus.OK).json({
        message: `${userData.email} is Logout Successfully`,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      console.error("Other error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Accessing the ID from URL params

    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.MISSING_DATA);
    }

    // Token is valid, proceed with user deletion
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(HttpStatus.BAD_REQUEST).json("User not found.");
    }
    const deletedReq = await DeleteUser.findOneAndDelete({ userId });
    const deleteForm = await UserForm.findOneAndDelete({ userID: userId });

    if (deleteForm && deleteForm.image) {
      // Delete images from S3

      await deleteFileByURL(deleteForm.image);
    }

    if (
      deleteForm &&
      deleteForm.video &&
      Array.isArray(deleteForm.video) &&
      deleteForm.video.length > 0
    ) {
      // Delete videos from S3
      for (const videoUrl of deleteForm.video) {
        await deleteFileByURL(videoUrl);
      }
    }

    return res.status(HttpStatus.OK).json(StatusMessage.USER_DELETED);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.BAD_REQUEST).json("Error deleting user.");
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id, updatedDetails } = req.body;

    if (!id || !updatedDetails) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.MISSING_DATA);
    }

    if (updatedDetails.password) {
      // Hash the new password before updating
      updatedDetails.password = await bcrypt.hash(updatedDetails.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedDetails, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(HttpStatus.BAD_REQUEST).json("User not found.");
    }

    return res.status(HttpStatus.OK).json(updatedUser);
  } catch (error) {
    console.error(error);
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email === 1
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_EMAIL);
    }
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.contact === 1
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.DUPLICATE_CONTACT);
    }
    return res.status(HttpStatus.BAD_REQUEST).json("Error updating user.");
  }
};
exports.getUserByID = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const userData = await User.findById(_id);
    if (!userData) {
      return res.status(HttpStatus.INVALID).json(StatusMessage.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(userData);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.BAD_REQUEST).json("Error fetching users.");
  }
};

exports.viewUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 1000; // Default limit to 10 if not specified
    const search = req.query.search || "";

    if (!page || !limit) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.MISSING_PAGE_PARAMS);
    }

    const startIndex = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { contact: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(query).skip(startIndex).limit(limit);
    const totalUsers = await User.countDocuments(query);

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers: totalUsers,
    };

    return res.status(HttpStatus.OK).json({ users, pagination });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.BAD_REQUEST).json("Error fetching users.");
  }
};

exports.forgotPwd = async (req, res) => {
  const { contact, email } = req.body;
  if (!(email || contact)) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(StatusMessage.INVALID_EMAIL_PASSWORD);
  }
  let user;
  if (email) {
    user = await User.findOne({ email });
  } else {
    user = await User.findOne({ contact });
  }
  if (!user) {
    if (email) {
      user = await Admin.findOne({ email });
    } else {
      user = await Admin.findOne({ contact });
    }
  }
  if (!user) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json(StatusMessage.USER_NOT_FOUND);
  }
  const token = generateToken({ email: user.email });
  const mailOptions = {
    from: "akash.hardia@gmail.com",
    to: user.email,
    subject: "Reset Password Link",
    text: `<h2>Hello! ${user.name ? user.name : ""} </h2>
      <h3>Please follow the link to reset your password: http://localhost:5000/user/reset-password/${token}</h3>
      <h3>Thanks and regards</h3>
      `,
  };

  try {
    console.log(JSON.stringify(user._id));
    if (user.role === "Admin") {
      const tokenUpdateAdmin = await Admin.findByIdAndUpdate(
        user._id,
        { resetToken: token },
        { new: true }
      );
      console.log(tokenUpdateAdmin);
      if (!tokenUpdateAdmin) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(StatusMessage.USER_NOT_FOUND);
      }
    }
    if (user.role === "User") {
      const tokenUpdateUser = await User.findByIdAndUpdate(
        user._id,
        { resetToken: token },
        { new: true }
      );
      console.log(tokenUpdateUser);
      if (!tokenUpdateUser) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json(StatusMessage.USER_NOT_FOUND);
      }
    }
    const info = await sendEmail(mailOptions);
    console.log("Email sent:", info);
    return res.status(200).json("Reset link sent to registered mail.");
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  let hashedPassword;
  if (!password) {
    return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_DATA);
  } else {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const authHeader = req.headers.authorization;
  let token = "";
  let user = "";
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  } else {
    token = authHeader;
  }
  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please login to access this resource" });
  } else {
    const decodedData = verifyToken(token);
    //   console.log(decodedData);
    if (!decodedData) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.USER_NOT_FOUND);
    }
    user = await User.findOne({ email: decodedData?.email ,resetToken:token});
    if (user === null) {
      user = await Admin.findOne({ email: decodedData?.email ,resetToken:token});
    }
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json("Token expired.");
    }
    const role = user.role;
    const id = user._id?.toString(); // Accessing _id using dot notation
    // console.log(userId);
    console.log(role);
    if (!role) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.USER_NOT_FOUND);
    }
    if (role === "Admin") {
      try {
        const updatedUser = await Admin.findByIdAndUpdate(
          id, // pass the ID directly
          { password: hashedPassword ,resetToken: null }, // update only the password field
          { new: true }
        );
        if (!updatedUser) {
          return res.status(HttpStatus.BAD_REQUEST).json("User not found.");
        }

        return res.status(HttpStatus.OK).json(updatedUser);
      } catch (error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json("Error updating password.");
      }
    }
    if (role === "User") {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id, // pass the ID directly
          { password: hashedPassword,resetToken: null  }, // update only the password field
          { new: true }
        );
        if (!updatedUser) {
          return res.status(HttpStatus.BAD_REQUEST).json("User not found.");
        }

        return res.status(HttpStatus.OK).json(StatusMessage.USER_UPDATED);
      } catch (error) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json("Error updating password.");
      }
    }
    // console.log("user", user._id);
  }
};

exports.changeUserPwd = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const authHeader = req.headers.authorization;
  let token = "";
  let user = "";

  if (!authHeader || !oldPassword || !newPassword) {
    return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_DATA);
  }
  try {
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }
    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access this resource" });
    } else {
      const decodedData = jwt.verify(token, process.env.jwtKey);
      //   console.log(decodedData);
      if (!decodedData) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(StatusMessage.USER_NOT_FOUND);
      }
      user = await User.findOne({ email: decodedData?.email });
      if (!user) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(StatusMessage.USER_NOT_FOUND);
      }
    }
    // const user = await Admin.findById(id)
    //  console.log(user._id.toString());
    const id = user._id?.toString();
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (isPasswordMatch) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const changedPwd = await User.findByIdAndUpdate(id, {
        password: hashedPassword,
      });
      if (!changedPwd) {
        return res.status(HttpStatus.BAD_REQUEST).json("User not found.");
      } else {
        return res.status(HttpStatus.OK).json(StatusMessage.USER_UPDATED);
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json("Old password does not match.");
    }
  } catch (error) {
    console.log(error);
    return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
  }
};

exports.deleteUserReq = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(StatusMessage.MISSING_DATA);
    }

    // Check if a delete request already exists for this userId
    const existingRequest = await DeleteUser.findOne({ userId });
    if (existingRequest) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Deletion request for this user already exists." });
    }

    // If no existing request, proceed to save new request
    const newDeleteReq = new DeleteUser({ userId });
    const result = await newDeleteReq.save();
    console.log(result); // For debugging

    // Return success response
    return res.status(HttpStatus.OK).json(result);
  } catch (error) {
    console.error(error); // For debugging
    // General server error
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(StatusMessage.SERVER_ERROR);
  }
};

exports.getDeleteUserRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    // Aggregation pipeline
    const deleteUserRequests = await DeleteUser.aggregate([
      {
        $lookup: {
          from: User.collection.name,
          let: { userId: "$userId" }, // Use userId from DeleteUser
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$userId"], // Match _id from User with userId from DeleteUser
                },
              },
            },
            {
              $project: {
                password: 0, // Exclude the password field
                activeToken: 0, // Exclude the activeToken field
                step: 0,
                role: 0,
                // Exclude any other fields as needed
              },
            },
          ],
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      { $skip: startIndex },
      { $limit: limit },
    ]);

    // Count total delete user requests
    const totalRequests = await DeleteUser.countDocuments();

    // Pagination details
    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalRequests / limit),
      totalRequests,
    };

    return res.status(200).json({ deleteUserRequests, pagination });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching delete user requests" });
  }
};
