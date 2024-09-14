const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  episodeNumber : {
    type : Number,
    required : true
  },
  episodeName : {
    type : String,
    required : true
  },
  episodeDate : {
    type : Date,
  },
  episodeStatus : {
    type : Boolean,
    default : false
  },
})

const seasonSchema = new mongoose.Schema({
  seasonNumber : {
    type : Number,
    required : true
  },
  episodes : [episodeSchema]
})

const tvSchema = new mongoose.Schema({
  tvId : {
    type : String,
    required : true
  },
  tvShowName : {
    type : String,
    required : true
  },
  tvTotalSeasons : {
    type : Number,
  },
  seasons : [seasonSchema]
})

const movieSchema = new mongoose.Schema({
  movieId : {
    type : String,
    required : true
  },
  movieName : {
    type : String,
    required : true
  },
  movieDate : {
    type : Date,
  },
  movieStatus : {
    type : Boolean,
    default : false
  },
})

const mediaSchema = new mongoose.Schema({
  tvShows : [tvSchema],
  movies : [movieSchema]
})

module.exports = mediaSchema