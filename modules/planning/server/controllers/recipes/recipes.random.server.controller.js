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
        Recipes.findOne().limit(-(rnd + 1)).skip(rnd).limit(1).lean().exec(function(err, data) {
            if (!err) {
                var recipe = data;
                recipe.persons = req.params.year;
                recipe.fromRequest = req.params.year;
                // {
                //     year: req.params.year,
                //     month: req.params.month,
                //     day: req.params.day,
                //     index: req.params.index
                // };
                res.json(recipe);
                console.log('fromRequest',recipe.fromRequest, recipe);
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
        });
    });
};
