var util = require('util');

var OAuth2Strategy = require('passport-oauth2').Strategy;

/**
 * `Strategy` constructor.
 */
exports = function (options, verify) {
	options = options || {};
	// options.authorizationURL = options.authorizationURL || 'https://accounts.google.com/o/oauth2/auth';
	// options.tokenURL = options.tokenURL || 'https://accounts.google.com/o/oauth2/token';

	OAuth2Strategy.call(this, options, verify);
	this.name = 'oil';
};

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(exports, OAuth2Strategy);

module.exports = exports;
