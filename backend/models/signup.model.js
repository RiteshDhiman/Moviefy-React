const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    userId : {
        type:String,
        required : true,
    },
    fullName : {
        type:String,
        required : true
    }
})

const User = mongoose.model("User", signUpSchema)

module.exports = User