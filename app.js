// Dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// dbconn
mongoose.connect('mongodb://localhost/lcc');

// ROUTER
var index = require('./routes/index');
var main = require('./routes/main');
var materia = require('./routes/materia');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// setup
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', index);
app.use('/main', main);
app.use('/materia', materia);
app.use('/api', api);

app.get('/test', function (req, res) {
    'use strict';
    //console.log(req);
    res.render('test');
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    'use strict';
    console.log(req + res);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        'use strict';
        console.log(req);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    'use strict';
    console.log(req);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
