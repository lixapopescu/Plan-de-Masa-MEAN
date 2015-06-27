'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var list = require('../controllers/list.server.controller');

	// Setting up the users profile api
	app.route('/api/list/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day').get(list.all);
	// app.route('/api/users').put(users.update);
	// app.route('/api/users/accounts').delete(users.removeOAuthProvider);
	// app.route('/api/users/password').post(users.changePassword);
	// app.route('/api/users/picture').post(users.changeProfilePicture);

	// Finish by binding the user middleware
	// app.param('userId', users.userByID);
};
