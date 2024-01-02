const UserForm = require("../Model/UserForm");
const uploadOnS3 = require("../Utils/awsS3");

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
exports.uploadImage = async (req, res, next) => {
    // console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Invalid request" });
      }
  
      let fileName = req.file.originalname;
  
      let url = await uploadOnS3(req.file.buffer, fileName); // Assuming req.file.buffer contains the image buffer
      console.log("URL:", url);
      return res.status(200).json({ status: true, url: url });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  
  };

  exports.addForm = async (req, res) => {
    try {
        const {
            userID, firstname, lastname, address, dateOfBirth, email, education,
            occupation, contactNumber, hobbies, gender, maritalStatus, religion,
            height, income, familyDetails, image
        } = req.body;

        // Check for missing data
        if (!userID || !firstname || !lastname || !address || !dateOfBirth || !email ||
            !education || !contactNumber || !gender || !maritalStatus || !religion || 
            !height || !income || !familyDetails) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_DATA);
        }

        // Create new user form
        const newUserForm = new UserForm({
            userID, firstname, lastname, address, dateOfBirth, email, education,
            occupation, contactNumber, hobbies, gender, maritalStatus, religion,
            height, income, familyDetails, image
        });

        // Save to database
        const result = await newUserForm.save();
        console.log(result); // For debugging

        // Return success response
        return res.status(HttpStatus.OK).json(result);

    } catch (error) {
        console.error(error); // For debugging
        // Handle specific errors
        // General server error
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
};
