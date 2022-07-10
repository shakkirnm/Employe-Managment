const express = require("express");
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

mongoose.connect(
    'mongodb://localhost:27017/employeeDb', 
    {useNewUrlParser : true, useUnifiedTopology:true},
    () => {        
        console.log("Successfully Connected Mongodb");
})


app.use(express.json());


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)

app.listen(4000, () => {
    console.log("Backed server is running!");
})