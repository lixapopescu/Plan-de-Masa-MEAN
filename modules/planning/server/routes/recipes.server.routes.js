'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var recipes = require('../controllers/recipes.server.controller');

	// Setting up the users profile api
	app.route('/api/recipes/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day').get(recipes.find);
	app.route('/api/recipes/:year/:month/:day/:recipe_url').get(recipes.findOne);
	app.route('/api/recipes/:year/:month/:day/:recipe_url').delete(recipes.deleteOne);
	app.route('/api/recipes/random/:index/:year/:month/:day').get(recipes.random);
};
