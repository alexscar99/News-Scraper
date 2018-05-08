var db = require('../models');
var express = require('express');
var router = express.Router();
var handlebarsObj;

router.get('/', function(req, res) {
  db.Article.find({}).then(function(result) {
    handlebarsObj = {
      articles: result
    };
    res.render('index', handlebarsObj);
  });
});

router.get('/saved', function(req, res) {
  db.Article.find({
    where: {
      saved: true
    }
  }).then(function(result) {
    handlebarsObj = {
      articles: result
    };
    res.render('saved', handlebarsObj);
  });
});

module.exports = router;
