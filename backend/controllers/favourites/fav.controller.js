const User = require('../../models/user.model.js')

const favouriteController = async(req,res) => {
  const {mediaName, id, userId, mediaType, posterPath} = req.body

  try {
    const user = await User.findOne({userId})

    if(user){
      const mediaFind =  user.favourites.find(item => item.id === id)

      if(mediaFind){
        res.status(200).json({message : "Already present in favourites"})
      }
      else{
        user.favourites.push({
          id,
          mediaName,
          mediaType,
          posterPath : 'https://image.tmdb.org/t/p/original'+ posterPath,
          mediaDate : new Date()
        })
        await user.save()
        res.status(200).json({message : 'Added to Favourites'})
      }
    }
  } catch (error) {
    res.status(500).json({
      message : 'Favourites Error'
    })
  }
}

module.exports = {favouriteController}