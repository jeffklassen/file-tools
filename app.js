var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');;
var bodyParser = require('body-parser');
var colors = require('colors');

console.log('Starting server'.yellow);



var app = express();
var routes = require('./routes/api');
//app.use(logger('dev'));
console.log('Setting parsers'.gray);
app.use(bodyParser.json({
    strict: false
}));


console.log('Mapping routes'.gray);
app.use('/', routes);

// catch 404 and forward to error handler
console.log('Registering error handlers'.gray);
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
        console.log(err);
        res.status(err.status || 500);
        res.send(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send(err);
});


module.exports = app;