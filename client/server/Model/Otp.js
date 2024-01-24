const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    "email":{
        type:String,
        required:[true, "Please provide user email."],
       
    },
   
    "otp":{
        type:String,
    },
    
}, {
    timestamps: true, // Add createdAt and updatedAt fields
})
const OtpUser = mongoose.model("OtpUser", userSchema)
module.exports = OtpUser;