const mongoose = require('mongoose');
const wishListSchema = require('./wishlist.model');

const userSchema = new mongoose.Schema({
    userId : {
        type:String,
        required : true,
    },
    fullName : {
        type:String,
        // required : true
    },
    wishlist:[wishListSchema]
})

const User = mongoose.model("User", userSchema)

module.exports = User