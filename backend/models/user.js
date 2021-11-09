const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        min:3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max:30
    },
    password: {
        type: String,
        required: true,
        min:6
    }
})

module.exports = mongoose.model("User",userSchema);