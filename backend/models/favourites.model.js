const mongoose = require('mongoose')

const favSchema = new mongoose.Schema({
  mediaName : {
    type : String,
    required : true
  },
  posterPath : {
    type : String,
    required : true
  },
  id:{
    type:String,
    required:true
  },
  mediaDate : {
    type : Date,
    required : true
  },
  mediaType : {
    type : String,
    required : true
  },

})

module.exports = favSchema