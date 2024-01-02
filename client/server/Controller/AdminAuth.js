const Admin = require("../Model/Admin")

const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require("../Utils/jwt");
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

        const hashedPassword = await bcrypt.hash(password, 10);

        const adminData = new Admin({ email, password: hashedPassword });

        const result = await adminData.save();

        // console.log(result); // Log the result for debugging, avoid exposing in production

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

        if (!email || !password) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_EMAIL_PASSWORD);
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(HttpStatus.UNAUTHORIZED).json(StatusMessage.USER_NOT_FOUND);
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);

        if (isPasswordMatch) {
            const token = generateToken({ email: admin.email });
            await Admin.findByIdAndUpdate({ _id: admin._id?.toString() }, { activeToken: token }, { new: true })

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