const mongoose = require('mongoose');

const getConnection = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Connection Successful')
        
    } catch (error) {
        console.log("DB connection error")
    }
}

module.exports = getConnection