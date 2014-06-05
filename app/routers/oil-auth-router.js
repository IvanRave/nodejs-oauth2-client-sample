/** @module routers/oil-auth-router */

var OilStrategy = require('../strategies/oil-strategy');

var cbkStrategy = function (accessToken, refreshToken, profile, done) {
	console.log('accessToken', accessToken);
	console.log('refreshToken', refreshToken);
	console.log('profile', profile);
	// console.log('profile', req.account);
	done(null, {
		id : 4444
	});
	// User.findOrCreate(..., function (err, user) {
	// done(err, user);
	// });
};

exports.createRouter = function (express, passport) {

	// auth client from
	// d:\GitRepo\nodejs-oauth2-provider-sample\app\db\auth-client
	passport.use('oil', new OilStrategy({
			authorizationURL : 'http://localhost:1337/dialog/authorize',
			tokenURL : 'http://localhost:1337/dialog/token',
			clientID : 'abc123',
			clientSecret : 'ssh-secret',
			callbackURL : 'http://localhost:22222/auth/oil/callback'
		}, cbkStrategy));

	var oilAuthRouter = express.Router();

	oilAuthRouter.get('/', passport.authenticate('oil', {
			scope : [
				'profile',
				'email'
			]
		}));

	oilAuthRouter.get('/callback',
		function (req, res, next) {
		console.log('oil-callback is executed');
		next();
	}, passport.authenticate('oil', {
			successRedirect : '/info',
			failureRedirect : '/login-error'
		}));

	return oilAuthRouter;
};

module.exports = exports;
