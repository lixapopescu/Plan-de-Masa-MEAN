'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	// require('./list/users.authentication.server.controller'),
	// require('./list/users.authorization.server.controller'),
	// require('./list/users.password.server.controller'),
	require('./list/list.weekly.server.controller')
);