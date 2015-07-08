'use strict';

// var defaultUsername = 'website';

/**
 * Module dependencies.
 */
var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    Planning = mongoose.model('Planning');


exports.find = function(req, res) {
    var username = req.user.username;
    // console.log('recipes.weekly.server.controller ', username);
    var planning = Planning.find({
            date: {
                $gte: Utils.getDateFromString(req.params.start_year, req.params.start_month, req.params.start_day),
                $lte: Utils.getDateFromString(req.params.end_year, req.params.end_month, req.params.end_day)
            },
            username: username,
            $or: [{
                archived: 0
            }, {
                archived: {
                    $exists: false
                }
            }]

        },
        function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });

            }
        });
};
