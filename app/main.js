/** @module main */

var express = require('express');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var googleAuthRouter = require('./routers/google-auth-router');
var oilAuthRouter = require('./routers/oil-auth-router');

exports.init = function () {
	var app = express();

	app.use(cookieParser());
	app.use(expressSession({
			secret : 'mysecretkey'
			// set max age for persistent cookies
			// // cookie : {
			// // maxAge : 60000
			// // }
		}));

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (userId, done) {
		// remove password from its
		done(null, {
			id : userId
		});
	});

	app.get('/', function (req, res) {
		res.send('Go to /auth/provider to start OAuth2 authorize');
	});

	app.use('/auth/provider', googleAuthRouter.createRouter(express, passport));

	app.use('/auth/oil', oilAuthRouter.createRouter(express, passport));

	app.get('/info', function (req, res) {
		if (req.isAuthenticated()) {
			res.send(req.user);
		} else {
			res.send('noauth');
		}
	});

	// For non-existing pages
	app.use(function (req, res) {
		res.status(404);
		res.send({
			error : 'Not found'
		});
		return;
	});

	app.listen(22222, function () {
		console.log('Express server listening on port 22222');
	});
};

module.exports = exports;
