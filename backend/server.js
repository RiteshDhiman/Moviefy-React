const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const cron = require('node-cron')
const axios = require('axios')

app.use(cors({
    // origin: 'http://localhost:5173',
    origin: 'https://moviefy-ritesh.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  }));
  
const getConnection = require('./db/connection');
const userRouter = require('./routes/Signup.route.js')
const wishlistRouter = require('./routes/Wishlist.route.js')
const mediaRouter = require('./routes/Track.route.js')
// app.use(cors());

dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use('/auth', userRouter)
app.use('/add', wishlistRouter)
app.use('/track', mediaRouter)

app.get('/',(req,res)=>{
    res.status(200).json({message : "Postman request success"})
})

app.get('/ping',(req,res) => {
  res.send('Server is active (CRON)')
})

cron.schedule('*/10 * * * *', async() => {
  try {
    await axios.get('https://moviefy-react.onrender.com/ping')
    console.log('Pinging the server to prevent render spin down')
  } catch (error) {
    console.error('Failed to ping the server', error)
  }
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

app.listen(PORT, ()=>{
    getConnection()
    console.log('Server Live on port', PORT)
})