const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// scraping tools
const cheerio = require('cheerio');
const axios = require('axios');

// require models and initialize express
const db = require('./models');
const PORT = process.env.PORT || 3000;
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// configure middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const routes = require('./controller/controller.js');
app.use(routes);

// connect to db and write routes
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/scraperDB';
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get('/scrape', function(req, res) {
  db.Article.remove({});
  axios.get('http://www.espn.com/').then(function(response) {
    const $ = cheerio.load(response.data);

    $('article').each(function(i, element) {
      let result = {};

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
    res.redirect('/');
  });
});

app.get('/articles', function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get('/articles/:id', function(req, res) {
  db.Article.findOne({
    _id: req.params.id
  })
    .populate('comment')
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post('/articles/:id', function(req, res) {
  db.Comment.create(req.body)
    .then(function(dbComment) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { comment: dbComment._id },
        { new: true }
      );
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.put('/articles/:id', function(req, res) {
  db.Article.update(
    {
      _id: req.params.id
    },
    { $set: { favorited: req.body.favorited } }
  )
    .then(function(dbArticle) {
      console.log(dbArticle);
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
  console.log('App running on port ' + PORT + '!');
});
