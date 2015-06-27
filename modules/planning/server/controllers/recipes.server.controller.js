'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend recipes's controller
 */
module.exports = _.extend(
	require('./recipes/recipes.weekly.server.controller'),
	require('./recipes/recipes.daily.server.controller'),
	require('./recipes/recipes.random.server.controller')
);