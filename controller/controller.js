var db = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var hbsObject;

  db.Article.find({}).then(function(result) {
    hbsObject: {
      articles: result;
    }
    res.render('index', hbsObject);
  });
});

router.get('/saved', function(req, res) {
  var hbsObject;

  db.Article.find({
    where: {
      saved: true
    }
  }).then(function(result) {
    hbsObject: {
      articles: result;
    }
    res.render('saved', hbsObject);
  });
});

module.exports = router;
