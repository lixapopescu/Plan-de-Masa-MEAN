'use strict';

var decodeRecipeUrl = function (url){
    return decodeURI(url).replace(/_/g, ' ');
};

/**
 * Module dependencies.
 */
var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    Planning = mongoose.model('Planning');


exports.findOne = function(req, res) {
    console.log('findOne recipes.daily.server.controller', Utils.getDateFromString(req.params.year, req.params.month, req.params.day), decodeRecipeUrl(req.params.recipe_url));
    var planning = Planning.findOne({
            date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
            'recipe.title': decodeRecipeUrl(req.params.recipe_url)
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
