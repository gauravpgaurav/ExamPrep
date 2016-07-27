var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var MongoClient = require('mongodb').MongoClient;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

MongoClient.connect('mongodb://localhost:27017/exam', function(err, db) {
  // Homepage
  router.get("/", function(req, res) {
    "use strict";

    var page = req.query.page ? parseInt(req.query.page) : 0;
    var category = req.query.category ? req.query.category : "All";

    items.getCategories(function(categories) {

      items.getItems(category, page, ITEMS_PER_PAGE, function(pageItems) {

        items.getNumItems(category, function(itemCount) {

          var numPages = 0;
          if (itemCount > ITEMS_PER_PAGE) {
            numPages = Math.ceil(itemCount / ITEMS_PER_PAGE);
          }

          res.render('home', { category_param: category,
            categories: categories,
            useRangeBasedPagination: false,
            itemCount: itemCount,
            pages: numPages,
            page: page,
            items: pageItems });

        });
      });
    });
  });
});
// Start the server listening
var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('ExamPrep server listening on port %s.', port);
});
module.exports = app;
