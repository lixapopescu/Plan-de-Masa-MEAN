'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
	// User Routes
	var recipes = require('../controllers/recipes.server.controller');

	// Setting up the recipes api
	app.route('/api/recipes/:start_year(\\d+)/:start_month(\\d+)/:start_day(\\d+)/:end_year(\\d+)/:end_month(\\d+)/:end_day(\\d+)').get(recipes.find);
	app.route('/api/recipes/:year(\\d+)/:month(\\d+)/:day(\\d+)/:recipe_url').get(recipes.findOne);
	app.route('/api/recipes/:year(\\d+)/:month(\\d+)/:day(\\d+)/:recipe_url').delete(recipes.deleteOne);
	// app.route('/api/recipes/random/:index/:year/:month/:day').get(recipes.random);
	app.route('/api/recipes/random/:index(\\d+)/:year(\\d+)/:month(\\d+)/:day(\\d+)/:filters').get(recipes.random);
	app.route('/api/recipes/random/:index(\\d+)/:year(\\d+)/:month(\\d+)/:day(\\d+)').get(recipes.random);
	app.route('/api/recipes/:id').get(recipes.findById);
	app.route('/api/recipes/').put(recipes.save);
	app.route('/api/labels').get(recipes.getRecipeLabels);
};
