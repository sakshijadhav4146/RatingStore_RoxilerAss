
const cors = require('cors');
const express = require('express');
const db=require('./models/db')
const userRoute = require('./routes/userRoute')
const storeRoute = require('./routes/storeRoute')
const ratingRoute = require('./routes/ratingRoute')
const dashboardRoute = require('./routes/dashboard')
const cookieParser = require('cookie-parser')

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',   
    credentials: true,  
  };
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/user',userRoute)
app.use('/store',storeRoute)
app.use('/rating',ratingRoute)
app.use('/dashboard',dashboardRoute)

app.listen(8000,()=>console.log("server started"))


