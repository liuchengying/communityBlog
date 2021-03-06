var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');
var User = require('./module_method').User;
var authUser = require('./middlewares/authentication').authUser;

var webRouter = require('./routes/web-router');

var apiRouter = require('./routes/restapi-router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(config.session_secret));
app.use(session({
	secret: config.session_secret,
	name: 'session_id',
	cookie: {maxAge: 60000},
	saveUninitialized: false,
	resave: false,
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use(authUser);

app.use('/', webRouter);
app.use('/api/v1/', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
