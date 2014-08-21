var _ = require('underscore');
var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var Q = require('q');
var swig = require('swig');

var unescape = function(input) {
  if (input) {
    return '"+\'' + JSON.stringify(input) + '\'+"';
  } else {
    return JSON.stringify({});
  }
};
unescape.safe = true;
swig.setFilter('escapejs', unescape);
swig.setDefaults({cache: false});

var app = express();
var router = express.Router();

var staticFolder = path.join(__dirname, '../../site/app/www/static.crane');

app.engine('html', swig.renderFile);
app.set('views', staticFolder)
app.set('view cache', false);
app.set('view engine', 'html')

router.use('/learn/:courseSlug', function(request, response) {
  response.render('pages/open-course/jade/app.html', {
    user: { wat: true}
  });
});

router.post(/^\/api/, function(request, response) {
  console.log(request.body)
  response.send();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use('/', router);
app.use('/static', express.static('../../site/app/www/static.crane'))
app.listen(3000);