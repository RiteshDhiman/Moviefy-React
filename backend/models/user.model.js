const mongoose = require('mongoose');
const wishListSchema = require('./wishlist.model');
const mediaSchema = require('./mediaTrack.model');
const favSchema = require('./favourites.model');

const userSchema = new mongoose.Schema({
    userId : {
        type:String,
        required : true,
    },
    fullName : {
        type:String,
        // required : true
    },
    wishlist:[wishListSchema],

    watchedMedia : mediaSchema,

    userCreationDate : {
        type : Date
    },

    favourites : [favSchema]
})

const User = mongoose.model("User", userSchema)

module.exports = User