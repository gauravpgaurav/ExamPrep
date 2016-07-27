var express = require('express'),
    bodyParser = require('body-parser'),
    nunjucks = require('nunjucks'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    WordsDAO = require('./words').wordsDAO,


// Set up express
app = express();
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

var env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

var nunjucksDate = require('nunjucks-date');
nunjucksDate.setDefaultFormat('MMMM Do YYYY, h:mm:ss a');
env.addFilter("date", nunjucksDate);

var WORDS_PER_PAGE = 15;

MongoClient.connect('mongodb://localhost:27017/exam', function(err, db) {
  // Homepage
  router.get("/", function(req, res) {
    "use strict";

    var words = new WordsDAO(db);
    var page = req.query.page ? parseInt(req.query.page) : 0;

    words.getWords(page, WORDS_PER_PAGE, function(pageWords) {

        words.getNumWords(function(wordsCount) {

          var numPages = 0;
          if (wordsCount > WORDS_PER_PAGE) {
            numPages = Math.ceil(wordsCount / WORDS_PER_PAGE);
          }
          //console.log(pageWords);
          res.render('home', {
            useRangeBasedPagination: false,
            wordsCount: wordsCount,
            pages: numPages,
            page: page,
            words: pageWords });

        });
      });
    });

});

// Use the router routes in our application
app.use('/', router);

// Start the server listening
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('ExamPrep server listening on port %s.', port);
});
module.exports = app;
