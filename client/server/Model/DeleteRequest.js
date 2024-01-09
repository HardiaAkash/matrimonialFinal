const mongoose = require("mongoose")
const deleteUserSchema = new mongoose.Schema({
    "userId":{
        type: mongoose.Schema.Types.ObjectId,
        required:[true, "Please provide user name."]
    },
    
}, {
    timestamps: true, // Add createdAt and updatedAt fields
})
const DeleteUser = mongoose.model("DeleteUser", deleteUserSchema)
module.exports = DeleteUser;