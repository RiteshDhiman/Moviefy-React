const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
// app.use(cors({
//     origin: 'https://moviefy-ritesh.vercel.app'
//   }));
const getConnection = require('./db/connection');
const userRouter = require('./routes/Signup.route.js')
const wishlistRouter = require('./routes/Wishlist.route.js')
const mediaRouter = require('./routes/Track.route.js')
app.use(cors());

dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/auth', userRouter)
app.use('/add', wishlistRouter)
app.use('/track', mediaRouter)

app.get('/',(req,res)=>{
    res.status(200).json({message : "Postman request success"})
})

app.listen(PORT, ()=>{
    getConnection()
    console.log('Server Live on port', PORT)
})