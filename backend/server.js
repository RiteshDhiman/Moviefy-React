const express = require('express');
const dotenv = require('dotenv');
const getConnection = require('./db/connection');
const userRouter = require('./routes/Signup.route.js')
const cors = require('cors')
const app = express();
app.use(cors())

dotenv.config()
app.use(express.json())
const PORT = process.env.PORT || 3000


app.get('/', (req,res)=>{
    res.status(201).json({
        message : "Hello"
    })
    // res.send("Hello")
    console.log('Hello from backend')
})

app.use('/auth', userRouter)

app.listen(PORT, ()=>{
    getConnection()
    console.log('Server Live')
})