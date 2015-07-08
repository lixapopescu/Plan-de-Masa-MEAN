'use strict';

var defaultUsername = 'website';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    List = require(path.resolve('./modules/planning/server/models/2.list.server.model.js'));

// mongoose = require('mongoose'),
// User = mongoose.model('List')


exports.all = function(req, res) {
    // console.log('"all" function', req.params);
    var username = req.user ? req.user.username : defaultUsername;
    new List(
        req.params.start_year,
        req.params.start_month,
        req.params.start_day,
        req.params.end_year,
        req.params.end_month,
        req.params.end_day,
        username,
        function(err, data) {
            if (!err) {
            	res.json(data);
            	// console.log('"all" function', data);
            }
            else
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
        });
};