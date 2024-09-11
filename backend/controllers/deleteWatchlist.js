const User = require("../models/user.model");

const deleteWatchlist = async(req,res)=>{
    const {userId, id} = req.body;

    try {
        const userFind = await User.findOne({userId})

        if(userFind){
            userFind.wishlist.pull({id})

            await userFind.save()
            res.status(200).json({ message: "Removed from watchlist" });
        }
    } catch (error) {
        res.status(500).json({
            message:"Watclist error while deleting"
        })
    }
}

module.exports = deleteWatchlist