'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Recipes = mongoose.model('Recipes');


//req parameters: year, month, day, index
exports.random = function(req, res) {
    console.log('random recipes.random.server.controller', req.params.year, req.params.month, req.params.day, req.params.index);

    Recipes.count({}, function(err, count) {
        var rnd = _.random(0, count - 1);
        // console.log(count, rnd);
        Recipes.find().limit(-rnd - 1).skip(rnd).limit(1).exec(function(err, data) {
            if (!err) {
                res.json(data[0]);
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
        });
    });
};
