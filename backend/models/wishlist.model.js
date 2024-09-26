const mongoose = require('mongoose')

const wishListSchema = new mongoose.Schema({
    mediaType : {
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
    },
    mediaName : {
        type:String,
        required:true
    },
    mediaDate : {
        type : Date
    },
    posterPath : {
        type:String
    }
})

module.exports = wishListSchema