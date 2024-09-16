const User = require("../../models/user.model");

const fetchTracking = async(req,res)=>{
    const {userId} = req.query;

    try {
        const listData = await User.findOne({userId})
        // console.log(listData)
        res.status(200).json(listData)
    } catch (error) {
        res.status(500).message({
            message:"Internal server error watchedmedia"
        })
    }
}

module.exports = fetchTracking