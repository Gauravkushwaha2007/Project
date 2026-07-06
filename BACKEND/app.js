require('dotenv').config()
const express = require('express');
const connectToDb = require('./db/db');
connectToDb()

const app = express();

app.get('/',(req, res)=>{
    res.send('Gaurav')
})


module.exports = app;