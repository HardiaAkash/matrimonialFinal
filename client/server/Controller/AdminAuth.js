const Admin = require("../Model/Admin")

const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require("../Utils/jwt");
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const sendEmail = require("../Utils/SendEmail");
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
    NOT_FOUND: "Data not found."
};
exports.addAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_DATA);
        }
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
          return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.DUPLICATE_EMAIL);
        }
    
        // const existingUserByContact = await User.findOne({ contact });
        // if (existingUserByContact) {
        //   return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.DUPLICATE_CONTACT);
        // }
        //////admin check
        const existingAdminByEmail = await Admin.findOne({ email });
        if (existingAdminByEmail) {
          return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.DUPLICATE_EMAIL);
        }
        // const existingAdminByContact = await Admin.findOne({ contact });
        // if (existingAdminByContact) {
        //   return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.DUPLICATE_CONTACT);
        // }

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminData = new Admin({ email, password: hashedPassword });

        const result = await adminData.save();

        // console.log(result); // Log the result for debugging, avoid exposing in production
        if (result) {
          const mailOptions = {
            from: "enotify@sacredspouse.com",
            to: email,
            subject: "Welcome to SacredSpouse - Your Admin Credentials",
            text: `
                <p>Dear ,</p>
                <p>Welcome to SacredSpouse! You are now an administrator of our platform.</p>
                <p>Please find below your login credentials:</p>
                <ul>
                    <li><strong>User-name:</strong> ${email}</li>
                    <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>For security reasons, we recommend keeping your login credentials confidential and not sharing them with anyone.</p>
                <p>Thank you for being a part of SacredSpouse.</p>
                <p>Best regards,</p>
               
            `,
        };
        
       const infow = await sendEmail(mailOptions)
       console.log(infow);
        }

        return res.status(HttpStatus.OK).json(result);
    } catch (error) {
        console.error(error); // Log the error for debugging, avoid exposing in production

        if (error.code === 11000 && error.keyPattern && error.keyPattern.email === 1) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.DUPLICATE_EMAIL);
        }

        return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
};
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_EMAIL_PASSWORD);
        }

        const admin = await Admin.findOne({ email });
        console.log(admin);
        if (!admin) {
            return res.status(HttpStatus.UNAUTHORIZED).json(StatusMessage.USER_NOT_FOUND);
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        if (isPasswordMatch) {
            const token = generateToken({ email: admin.email });
            const updateToken =   await Admin.findByIdAndUpdate({ _id: admin._id?.toString() }, { activeToken: token }, { new: true })
// console.log(updateToken);
            return res.status(HttpStatus.OK).json({
                message: `Welcome ${admin.email}`,
                token: token,
            });
        } else {
            return res.status(HttpStatus.UNAUTHORIZED).json(StatusMessage.INVALID_CREDENTIALS);
        }
    } catch (error) {
        console.log(error);
        return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
};
exports.adminLogout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else {
      token = authHeader;
    }

    if (!token) {
      return res.status(401).json({ message: "Please login to access this resource" });
    }
    const decodedData = jwt.verify(token, process.env.jwtKey);
    const userData = await Admin.findOne({ email: decodedData?.email });
    if (userData.activeToken && userData.activeToken === token) {
      const user = await Admin.findOneAndUpdate(
        { email: decodedData.email, activeToken: token },
        { $unset: { activeToken: "" } }, // Unset the token
        { new: true }
      );
      if (!user) {
        return res.status(401).json({ message: 'Invalid session or token, please login again' });
      }
      return res.status(HttpStatus.OK).json({
        message: `${userData.email} is Logout Successfully`
      });
    } else {
      return res.status(401).json({ message: 'Token expired, please login again' });
    }

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please login again' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      console.error('Other error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  }
}
exports.changeAdminPwd = async (req, res) => {
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
      user = await Admin.findOne({ email: decodedData?.email });
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
      const changedPwd = await Admin.findByIdAndUpdate(id, {
        password: hashedPassword,
      });
      if (!changedPwd) {
        return res.status(HttpStatus.BAD_REQUEST).json("Admin not found.");
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
exports.getAllAdmins = async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      if (!page || !limit) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid page or limit parameter." });
      }

      const startIndex = (page - 1) * limit;

      let query = {}; // You can add more conditions based on your needs

      // Add search query
      if (search) {
          query.$or = [
              { email: { $regex: search, $options: 'i' } },
              // Add more fields for search if needed
          ];
      }

      const admins = await Admin.find(query).skip(startIndex).limit(limit);
      const totalAdmins = await Admin.countDocuments(query);

      const pagination = {
          currentPage: page,
          totalPages: Math.ceil(totalAdmins / limit),
          totalAdmins
      };

      return res.status(HttpStatus.OK).json({ admins, pagination });
  } catch (error) {
      console.error("Error in getAllAdmins:", error);
      return res.status(HttpStatus.SERVER_ERROR).json({ message: "Server error." });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
      const adminId = req.params.id; // Assuming adminId is passed as a URL parameter

      // Validate if id is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(adminId)) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid admin ID." });
      }

      // Find the admin by its _id
      const admin = await Admin.findById(adminId);

      // Check if the admin was found
      if (!admin) {
          return res.status(HttpStatus.BAD_REQUEST).json({ message: "Admin not found." });
      }

      // Delete the admin
      const DeletedAdmin =  await Admin.findByIdAndDelete(adminId);
      console.log(DeletedAdmin);
      return res.status(HttpStatus.OK).json({ message: "Admin deleted successfully." });
  } catch (error) {
      console.error("Error in deleteAdmin:", error);
      return res.status(HttpStatus.SERVER_ERROR).json({ message: "Server error." });
  }
};
