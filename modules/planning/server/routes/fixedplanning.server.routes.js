'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var fixedplanning = require('../controllers/fixedplanning.server.controller');

	app.route('/api/fixedplanning/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day').get(fixedplanning.find);
	app.route('/api/fixedplanning').get(fixedplanning.findAll);
};
