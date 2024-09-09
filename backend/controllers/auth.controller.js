const User = require('../models/signup.model.js')
const bcryptjs = require('bcryptjs')

const signUpEmailPass = async(req,res) => {

    const {userId, fullName} = req.body;

    const hasheduserId = await bcryptjs.hash(userId, 10)
    
    try {
        if(!userId){
            throw new Error("Enter user id")
        }
        
        const userExists = await User.findOne({userId})

        if(userExists){
            throw new Error("User exists")
        }

        const user = new User({
            userId : hasheduserId,
            fullName
        })

        await user.save()

        res.status(201).json({
            message : "User saved"
        })

    } catch (error) {
        res.send("Kuch to locha h")
    }
}

module.exports = {signUpEmailPass}