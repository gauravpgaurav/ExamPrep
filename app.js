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

var WORDS_PER_PAGE = 4;

MongoClient.connect('mongodb://localhost:27017/exam', function(err, db) {
  // Homepage
  router.get("/", function(req, res) {
    "use strict";

    var words = new WordsDAO(db);
    var page = req.query.page ? parseInt(req.query.page) : 0;
    //WORDS_PER_PAGE = req.body.WORDS_PER_PAGE ? parseInt(req.body.WORDS_PER_PAGE) : 4;
    WORDS_PER_PAGE = req.query.WORDS_PER_PAGE ? parseInt(req.query.WORDS_PER_PAGE) : 4;

    words.getWords(page, WORDS_PER_PAGE, function(pageWords) {

        words.getNumWords(function(wordsCount) {

          var numPages = 0;
          if (wordsCount > WORDS_PER_PAGE) {
            numPages = Math.ceil(wordsCount / WORDS_PER_PAGE);
          }
          res.render('home', {
            limit: WORDS_PER_PAGE,
            useRangeBasedPagination: false,
            wordsCount: wordsCount,
            pages: numPages,
            page: page,
            wordList: pageWords });

        });
      });
    });

  router.get("/level/:id", function(req, res) {
    "use strict";

    var id = parseInt(req.params.id);
    var level;
    if(id == 0)
      level = "Common Words 1";
    else if(id == 1)
      level = "Common Words 2";
    else if(id == 2)
      level = "Common Words 3";
    else if(id == 3)
      level = "Common Words 4";
    else if(id == 4)
      level = "Common Words 5";
    else if(id == 5)
      level = "Common Words 6";
    else if(id == 6)
      level = "Basic 1";
    else if(id == 7)
      level = "Basic 2";
    else if(id == 8)
      level = "Basic 3";
    else if(id == 9)
      level = "Basic 4";
    else if(id == 10)
      level = "Basic 5";
    else if(id == 11)
      level = "Basic 6";
    else if(id == 12)
      level = "Advanced 1";
    else if(id == 13)
      level = "Advanced 2";
    else if(id == 14)
      level = "Advanced 3";
    else if(id == 15)
      level = "Advanced 4";
    else if(id == 16)
      level = "Advanced 5";
    else if(id == 17)
      level = "Advanced 6";
    else if(id == 18)
      level = "Advanced 7";
    else
        level = "";
    
    var words = new WordsDAO(db);
    var page = req.query.page ? parseInt(req.query.page) : 0;

    words.getSortedWords(level, page, WORDS_PER_PAGE, function(pageWords) {

      words.getNumWordsLevel(level, function(wordsCount) {

        var numPages = 0;
        if (wordsCount > WORDS_PER_PAGE) {
          numPages = Math.ceil(wordsCount / WORDS_PER_PAGE);
        }
        res.render('level', {
          useRangeBasedPagination: false,
          wordsCount: wordsCount,
          pages: numPages,
          page: page,
          level: level,
          wordList: pageWords });

      });
    });
  });

  router.get("/addWord", function(req, res) {
    "use strict";
        res.render('addWord', {});
      });

  router.post("/submitWord", function(req, res) {
    "use strict";

    var words = new WordsDAO(db);
    var wordTitle = req.body.word;
    var wordLevel = req.body.level;
    var wordMeaning = req.body.meaning;
    var wordExample = req.body.example;

    words.addWord( wordTitle, wordLevel, wordMeaning, wordExample, function(results) {
      res.redirect("/addWord");
    });
  });

  router.get("/search", function(req, res) {
    "use strict";

    var words = new WordsDAO(db);
    var page = req.query.page ? parseInt(req.query.page) : 0;
    var query = req.query.query ? req.query.query : "";

    words.searchWords(query, page, WORDS_PER_PAGE, function(searchWords) {

      words.getNumSearchWords(query, function(wordCount) {

        var numPages = 0;

        if (wordCount > WORDS_PER_PAGE) {
          numPages = Math.ceil(wordCount / WORDS_PER_PAGE);
        }

        res.render('search', { queryString: query,
          wordCount: wordCount,
          pages: numPages,
          page: page,
          wordList: searchWords });

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
