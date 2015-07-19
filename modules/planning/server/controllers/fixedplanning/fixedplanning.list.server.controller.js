'use strict';

var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    FixedPlanning = mongoose.model('FixedPlanning'),
    Planning = mongoose.model('Planning');


exports.find = function(req, res) {
    console.log('find fixedplanning', req.user.username, req.params);
    FixedPlanning.find({
        interval: {
            startDate: Utils.getDateFromString(req.params.start_year, req.params.start_month, req.params.start_day),
            endDate: Utils.getDateFromString(req.params.end_year, req.params.end_month, req.params.end_day)
        },
        username: req.user.username,
        $or: [{
            archived: 0
        }, {
            archived: {
                $exists: false
            }
        }]
    }, function(err, data) {
        if (!err) {
            // console.log(data);
            res.json(data);
        } else {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });

        }

    });
};

exports.findAll = function(req, res) {
    console.log('findAll fixedplanning', req.user.username);
    FixedPlanning.find({
            username: req.user.username,
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
                // console.log(data);
                res.json(data);
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });

            }

        });
};
