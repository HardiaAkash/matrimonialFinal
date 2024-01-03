const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    "userID": {
        type: String,
        required: [true],
        unique: [true]
    },
    "firstname": {
        type: String,
        required: [true]
    },
    "lastname": {
        type: String,
        required: [true]
    },
    "address": {
        type: String,
        required: [true]
    },
    "dateOfBirth": {
        type: String,
        required: [true]
    },
    "email": {
        type: String,
        required: [true, "Please provide user email."],
        // unique:[true, "Email already exist."]
    },
    "education": {
        type: String,
        required: [true]
    },
    "occupation": {
        type: String,

    },
    "contactNumber": {
        type: String,
        required: [true, "Please provide user contact number."],
    },
    "hobbies": {
        type: Array,

    },
    "gender": {
        type: String,
        required: [true],
    },
    "maritalStatus": {
        type: String,
        required: [true],
    },
    "religion": {
        type: String,
        required: [true],
    },
    "height": {
        type: String,
        required: [true],
    },
    "income": {
        type: String,
        required: [true],
    },
    "familyDetails": {
        type: String,
        required: [true],
    },
    "image":{
        type: String,
    },
    "formStatus":{
        type: String, 
        default: "Pending"
    }

})
const UserForm = mongoose.model("UserForm", userSchema)
module.exports = UserForm;