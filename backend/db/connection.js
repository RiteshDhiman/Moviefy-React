const mongoose = require('mongoose');

const getConnection = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Live')
        
    } catch (error) {
        console.log("Db connection error")
    }
}

module.exports = getConnection