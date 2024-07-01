const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user_management');

const app = express();
app.use(express.json());

const scope = '/api/v1'
app.use(`${scope}/user_management`, router);

mongoose.connect("mongodb+srv://gokul:Password%40123@spotify.ytstyuv.mongodb.net/?retryWrites=true&w=majority&appName=spotify").then(
    ()=> {
        console.log('Connected to mongo db');
        app.listen(3000, ()=>{
            console.log('App listening in port 3000');
        })
    }
).catch((error)=>{
    console.log(`Mongo db connection error: ${error}`);
});