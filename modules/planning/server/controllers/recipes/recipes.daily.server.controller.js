'use strict';

var decodeRecipeUrl = function(url) {
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
    Recipes = mongoose.model('Recipes'),
    Planning = mongoose.model('Planning');


exports.findOne = function(req, res) {
    // console.log('findOne recipes.daily.server.controller', Utils.getDateFromString(req.params.year, req.params.month, req.params.day), decodeRecipeUrl(req.params.recipe_url));
    if (req.params.recipe_url !== '_') {
        Planning.findOne({
                date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
                'recipe.title': decodeRecipeUrl(req.params.recipe_url),
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
                    res.json(data);
                } else {
                    res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });

                }
            });
    } else {
        Planning.findOne({
                date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
                // 'recipe.title': decodeRecipeUrl(req.params.recipe_url),
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
                    res.json(data);
                } else {
                    res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });

                }
            });

    }
};


exports.deleteOne = function(req, res) {
    var username = req.user.username;
    console.log('recipes.weekly.server.controller DELETE', username);
    Planning.update({
        date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
        'recipe.title': decodeRecipeUrl(req.params.recipe_url),
        $or: [{
            archived: 0
        }, {
            archived: {
                $exists: false
            }
        }]
    }, {
        archived: 1
    }, function(err, data) {
        if (!err) {
            res.json(data);
        } else {
            res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
    });
};

exports.save = function(req, res) {
    console.log('save recipe, just recipe, no date');
    console.log(req.body.recipe);
    if (req.body.recipe) {
        Recipes.save(req.body.recipe);
    }
    res.send('ok');
};
