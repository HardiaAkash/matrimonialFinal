const { mongoose } = require("mongoose");
const CounVideo = require("../Model/CounVideo");

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
  exports.addCounVideo = async (req, res) => {
    try {
        const { video, name } = req.body;

        // Check for missing data
        if (!video || !name) {
            return res.status(HttpStatus.BAD_REQUEST).json(StatusMessage.MISSING_DATA);
        }

        // Define a filter for finding the document. Adjust this based on your needs.
        // For instance, if `name` is unique and you want to update based on `name`, use it as a filter.
        const filter = {}; // If you want to update a specific document, define the filter here.

        // Define update details
        const update = { video, name };

        // Find one document and update it, set `new: true` to return the updated document
        const result = await CounVideo.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true // This creates a new document if no document matches the filter
        });

        console.log(result); // For debugging

        // Return success response
        return res.status(HttpStatus.OK).json(result);

    } catch (error) {
        console.error(error); // For debugging
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
};

exports.getAllCounsVideo = async(req, res)=>{
    try {
        const videos = await CounVideo.find({});
        res.status(200).json(videos);
    } catch (error) {
        console.error(error); // For debugging
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(StatusMessage.SERVER_ERROR);
    }
}

