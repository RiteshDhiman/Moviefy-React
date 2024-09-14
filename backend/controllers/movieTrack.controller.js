const User = require("../models/user.model")

const trackMovie = async(req,res) => {
  const {userId, movieId, movieName, watchedDate} = req.body
  try {
    console.log(userId, movieId, movieName, watchedDate)
    const userFind = await User.findOne({userId})
    
    if(userFind){

      if (!userFind.watchedMedia) {
        userFind.watchedMedia = { movies: [], tvShows: [] };
      }

      const movieFind = userFind.watchedMedia.movies.find(item => item.id === movieId)

      if(movieFind){
        res.status(200).json({message : 'Movie already tracked'})
      }
      else{
        userFind.watchedMedia.movies.push({
          movieId,
          watchedDate,
          movieName,
          movieStatus : true
        })
        await userFind.save()
        res.status(200).json({ message: "Added to tracking" });
      }
    }
    else{
      res.status(404).json({ message: 'User not found' });
    }
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error - tracking' });
  }
}

module.exports = trackMovie