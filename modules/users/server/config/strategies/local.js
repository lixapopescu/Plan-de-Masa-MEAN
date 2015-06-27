'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	// Use local strategy
	passport.use(new LocalStrategy({
			usernameField: 'email',//'username',
			passwordField: 'password'
		},
		function(username, password, done) {
			User.findOne({
				username: username
			}, function(err, user) {
				console.log('server local strategy', err, user);
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false, {
						message: 'Email neînregistrat'
					});
				}
				if (!user.authenticate(password)) {
					return done(null, false, {
						message: 'Parolă invalidă'
					});
				}

				return done(null, user);
			});
		}
	));
};