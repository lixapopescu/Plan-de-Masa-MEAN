'use strict';

/**
 * For recipes already in planning
 */

var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    Planning = mongoose.model('Planning');

exports.findById = function(req, res) {
    console.log('findById', req.params, req.user.username);
    Planning.findOne({
            '_id': req.params.id,
            username: req.user.username
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
