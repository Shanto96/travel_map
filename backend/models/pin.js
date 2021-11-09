const mongoose = require("mongoose");

const pinSchema =  new mongoose.Schema({
    userName:{
        type: String,
        required: true,
      
    },
    title: {
        type: String,
        required: true,
        max:15
    },
    desc: {
        type: String,
       
        min:6
    },
    rating: {
        type: Number,
        required: true,
        min:0,
        max:5
    },
    lat : {
        type: Number,
        required: true,
    },
    long : {
        type: Number,
        required: true,
    }

},{timestamps:true})

module.exports = mongoose.model("Pin",pinSchema);