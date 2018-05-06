module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {});
  });

  app.get('/articles', function(req, res) {
    res.render('saved-articles', {});
  });
};
