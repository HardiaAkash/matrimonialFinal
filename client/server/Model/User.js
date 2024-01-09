const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    "name":{
        type:String,
        required:[true, "Please provide user name."]
    },
    "email":{
        type:String,
        required:[true, "Please provide user email."],
        unique:[true, "Email already exist."]
    },
    "contact":{
        type:String,
        required:[true, "Please provide user contact number."],
        unique:[true, "Contact number already exist."]
    },
    "password":{
        type:String,
    },
    "step":{
        type:String,
        default: 1
    },
    "role":{
        type:String,
        default: "User"
    },
    "activeToken":{
        type:String,
    },
    "resetToken":{
        type:String
    }
}, {
    timestamps: true, // Add createdAt and updatedAt fields
})
const User = mongoose.model("User", userSchema)
module.exports = User;