const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    "userID": {
        type: String,
        
        unique: [true]
    },
    "firstname": {
        type: String,
        
    },
    "middlename": {
        type: String,

    },
    "lastname": {
        type: String,
        
    },
    "age": {
        type: String,

    },
    "address": {
        type: String,
       
    },
    "city": {
        type: String,
       
    },
    "state": {
        type: String,
       
    },
    "dateOfBirth": {
        type: String,
       
    },
    "background": {
        type: String,
        // 
    },
    "nativelanguage": {
        type: String,
        // 
    },
    "weight": {
        type: String,
    },
    "email": {
        type: String,
        required: [true, "Please provide user email."],
        // unique:[true, "Email already exist."]
    },
    "education": {
        type: String,
        
    },
    "degree": {
        type: String,
    },
    "occupation": {
        type: String,

    },
    "hijabStatus": {
        type: String,
    },
    "wantRelocate": {
        type: String,
    },
    "isKid": {
        type: String,
    },
    "NoOfKids": {
        type: String,
    },
    "wantKid": {
        type: String,
    },
    "isSmoke": {
        type: String,
    },
    "immigrationStatus": {
        type: String,
    },
    "socialMedia": {
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
        
    },
    "maritalStatus": {
        type: String,
        
    },
    "religion": {
        type: String,
        
    },
    "height": {
        type: String,
        
    },
    "income": {
        type: String,
        
    },
    "familyDetails": {
        type: String,
        
    },
    "image": {
        type: String,
    },
    "video": {
        type: Array,
    },
    "formStatus": {
        type: String,
        default: "Pending"
    },
    "isMatched": {
        type: String,
        default: false
    },
    "potentialMatched":{
        type: Array
    },
    "partnerAge": {
        type: String,
    },
    "partnerGender": {
        type: String,
    },
    "partnerMaritalStatus": {
        type: String,
    },
    "partnerReligion": {
        type: String,
    },
    "partnerBackground": {
        type: String,
    },
    "partnerIncome": {
        type: String,
    },
    "partnerCity": {
        type: String,
    },
    "partnerCountry": {
        type: String,
    },
    "partnerState": {
        type: String,
    },
    "partnerRelocate": {
        type: String,
    },
    "partnerEducation": {
        type: String,
    },
    "partnerHeight": {
        type: String,
    },
    "partnerWeight": {
        type: String,
    },
    "partnerIsKid": {
        type: String,
    },
    "partnerWantKid": {
        type: String,
    },
    "partnerImmigrationStatus": {
        type: String,
    },
    "partnerNativeLanguage": {
        type: String,
    },
    "partnerLanguageSpeak": {
        type: String,
    },
    "partnerDetail": {
        type: String,
    },
    "partnerHijabStatus": {
        type: String,
    },
}, {
    timestamps: true, // Add createdAt and updatedAt fields
})
const UserForm = mongoose.model("UserForm", userSchema)
module.exports = UserForm;