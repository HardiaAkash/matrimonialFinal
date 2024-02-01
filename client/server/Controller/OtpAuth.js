const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../Utils/jwt");
const sendEmail = require("../Utils/SendEmail");
const OtpUser = require("../Model/Otp");
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
  const generateOtp = () => {
    // Generate a random 5-digit number
    const otp = Math.floor(10000 + Math.random() * 90000);
    return otp.toString(); // Convert the number to a string
  };

  exports.addUserOTP = async (req, res) => {
    try {
      const {email } = req.body;
      console.log(email);
      if ( !email ) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(StatusMessage.MISSING_DATA);
      }
  
      const existingUserByEmail = await OtpUser.findOne({ email });
      if (existingUserByEmail) {
        const otp = generateOtp()
        const updateUser = await OtpUser.findByIdAndUpdate(
            existingUserByEmail._id, // Pass the user's _id
            { otp }, // Update the otp field
            { new: true } // Return the updated document
          );
          if (updateUser) {
            
            const mailOptions = {
                from: "enotify@sacredspouse.com",
                to: email,
                subject: "Email Verification",
                text: `
                  <h2>Hello!</h2>
                  <p>Your OTP for registering ${email} is <strong>${otp}</strong>. Please do not share it with anyone.</p>
                  <p>Thanks and regards</p>
                `,
              };
           const infow = await sendEmail(mailOptions)  
           console.log(infow);
           return res.status(HttpStatus.OK).json("OTP sent successfully.");
           return 
          }
      }
  
      // const existingAdminByContact = await Admin.findOne({ contact });
      // if (existingAdminByContact) {
      //   return res
      //     .status(HttpStatus.BAD_REQUEST)
      //     .json(StatusMessage.DUPLICATE_CONTACT);
      // }
  
      const newotp= generateOtp()
  
      const userData = new OtpUser({
        otp: newotp,
        email,
       
      });
  
      const result = await userData.save();
      if (result) {
        const mailOptions = {
            from: "enotify@sacredspouse.com",
            to: email,
            subject: "Email Verification",
            text: `
              <h2>Hello!</h2>
              <p>Your OTP for registering ${email} is <strong>${newotp}</strong>. Please do not share it with anyone.</p>
              <p>Thanks and regards</p>
            `,
          };
       const info = await sendEmail(mailOptions)  
       console.log(info);
       return res.status(HttpStatus.OK).json("OTP sent successfully.");
        
      }
  
    //   console.log(result); // Log the result for debugging, avoid exposing in production
  
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
      return res.status(HttpStatus.SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
  };
