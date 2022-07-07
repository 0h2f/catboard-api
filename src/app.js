const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const userModel = require('./models/user-model');
const postModel = require('./models/post-model');
const tagModel = require('./models/tag-model');

const indexRoute = require('./routes/index-route');
const userRoute = require('./routes/user-route');
const postRoute = require('./routes/post-route');

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true, parameterLimit: 20000 }));


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', indexRoute);
app.use('/users/', userRoute);
app.use('/posts/', postRoute)

module.exports = app;