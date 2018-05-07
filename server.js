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
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// configure middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./controller/html-routes.js')(app);

// connect to db and write routes
mongoose.connect('mongodb://localhost/newsScraper');

app.get('/scrape', function(req, res) {
  axios.get('http://www.espn.com/').then(function(response) {
    var $ = cheerio.load(response.data);

    $('article').each(function(i, element) {
      var result = {};

      result.title = $(this)
        .find('h1')
        .text();

      result.link =
        'http://www.espn.com' +
        $(this)
          .find('a')
          .attr('href');

      result.body = $(this)
        .find('p')
        .text();

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          return res.json(err);
        });
    });
    res.send('');
  });
});

app.get('/articles', function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});
