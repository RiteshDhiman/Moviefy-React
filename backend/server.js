const express = require('express');
const dotenv = require('dotenv');
const getConnection = require('./db/connection');
const userRouter = require('./routes/Signup.route.js')
const wishlistRouter = require('./routes/Wishlist.route.js')
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'https://moviefy-ritesh.vercel.app'
}));

dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/auth', userRouter)
app.use('/add', wishlistRouter)


app.listen(PORT, ()=>{
    getConnection()
    console.log('Server Live on port', PORT)
})