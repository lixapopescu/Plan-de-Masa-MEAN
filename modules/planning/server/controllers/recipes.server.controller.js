'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend recipes's controller
 */
module.exports = _.extend(
	require('./recipes/recipes.daily.server.controller'),
	require('./recipes/recipes.labels.server.controller'),
	require('./recipes/recipes.planning.server.controller'),
	require('./recipes/recipes.random.server.controller'),
	require('./recipes/recipes.weekly.server.controller')
);