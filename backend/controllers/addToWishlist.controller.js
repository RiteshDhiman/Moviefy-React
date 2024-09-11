const User = require("../models/user.model.js");

const addToWishList = async(req,res) => {
    const {userId, mediaType, id, mediaName, posterPath} = req.body;

    try {
        const userFind = await User.findOne({userId})

        if(userFind){
            userFind.wishlist.push({
                id,
                mediaName,
                mediaType,
                posterPath : 'https://image.tmdb.org/t/p/original'+ posterPath
            })

            await userFind.save()
            res.status(200).json({ message: "Added to watchlist" });
        }
    } catch (error) {
        res.status(500).json({
            message:"Watclist error"
        })
    }

}

module.exports = {addToWishList}