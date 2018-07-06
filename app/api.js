var express = require('express');
var router = require('../routes/controller');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/location', router);

module.exports = app;