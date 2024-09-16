const User = require('../../models/user.model.js')

const signUpEmailPass = async(req,res) => {

    const {userId, fullName} = req.body;
    
    try {
        if(!userId){
            throw new Error("Enter user id")
        }
        
        const userExists = await User.findOne({userId})

        if(userExists){
            throw new Error("User exists")
        }

        const user = new User({
            userId,
            fullName
        })

        await user.save()

        res.status(201).json({
            message : "User saved"
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error on signupcontroller"
        })
    }
}

module.exports = {signUpEmailPass}