var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// scraping tools
var cheerio = require('cheerio');
var axios = require('axios');

// require models and initialize express
var db = require('./models');
var PORT = 3000;
var app = express();

// configure middleware
app.use(logger('dev'));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect to db and routes
mongoose.connect('mongodb://localhost/newsScraper');
