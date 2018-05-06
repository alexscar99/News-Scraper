var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

// scraping tools
var cheerio = require('cheerio');
var axios = require('axios');

// require models and initialize express
var db = require('./models');

var PORT = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var app = express();

// configure middleware
app.use(logger('dev'));
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect to db and write routes
mongoose.connect('mongodb://localhost/newsScraper');

app.get('/', function(req, res) {
  axios.get('http://www.espn.com/').then(function(response) {
    var $ = cheerio.load(response.data);
  });
});
