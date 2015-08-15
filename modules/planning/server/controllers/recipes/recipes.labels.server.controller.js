'use strict';

var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    // mongoose = require('mongoose'),
    Labels = require(path.resolve('./modules/planning/server/models/labels.server.model.js'));

var defaultUsername = 'website';

exports.getRecipeLabels = function(req, res) {
    var username = req.user ? req.user.username : defaultUsername;

    new Labels(username,
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
