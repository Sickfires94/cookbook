var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
require('dotenv').config();

const URI = process.env.MONGO_URI;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors);

(async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

const router = require('./routes/index');
app.use('/', router);

app.use(function (req, res, next) {
    next(createError(404));
});

const PORT = 5600;
app.listen(PORT, console.log(`Server running port ${PORT}`));