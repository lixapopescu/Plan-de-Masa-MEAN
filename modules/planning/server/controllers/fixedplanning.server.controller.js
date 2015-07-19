'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend recipes's controller
 */
module.exports = _.extend(
	require('./fixedplanning/fixedplanning.list.server.controller')
);