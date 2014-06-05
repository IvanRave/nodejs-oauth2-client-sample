/** @module routers/google-auth-router */

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var cbkStrategy = function (accessToken, refreshToken, profile, done) {
	console.log('accessToken', accessToken);
	console.log('refreshToken', refreshToken);
	console.log('profile', profile);
	done(null, profile);
	// User.findOrCreate({ googleId: profile.id }, function (err, user) {
	// return done(err, user);
	// });
};

exports.createRouter = function (express, passport) {
	passport.use(new GoogleStrategy({
			clientID : '281945633711-of95n81ldfl5nvlt08jcr8u99mtu60j9.apps.googleusercontent.com',
			clientSecret : 'o4IriUuUPPfT1jpgUqyEa2kQ',
			callbackURL : 'http://localhost:22222/auth/provider/callback'
		}, cbkStrategy));

	var googleAuthRouter = express.Router();

	// Redirect the user to the OAuth 2.0 provider for authentication.  When
	// complete, the provider will redirect the user back to the application at
	//     /auth/provider/callback
	googleAuthRouter.get('/', passport.authenticate('google', {
			scope : [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
			]
		}));

	// generates a url that allows offline access and asks permissions
	// for Google+ scope.
	// // var scopes = [
	// // 'https://www.googleapis.com/auth/plus.me',
	// // 'https://www.googleapis.com/auth/calendar'
	// // 'https://www.googleapis.com/auth/userinfo.profile',
	// // 'https://www.googleapis.com/auth/userinfo.email'
	// // ];


	// The OAuth 2.0 provider has redirected the user back to the application.
	// Finish the authentication process by attempting to obtain an access
	// token.  If authorization was granted, the user will be logged in.
	// Otherwise, authentication has failed.
	googleAuthRouter.get('/callback',
		function (req, res, next) {
		console.log('google callback is fired: exchange token');
		next();
	}, passport.authenticate('google', {
			successRedirect : '/info',
			failureRedirect : '/error-login'
		}));

	return googleAuthRouter;
};

module.exports = exports;
