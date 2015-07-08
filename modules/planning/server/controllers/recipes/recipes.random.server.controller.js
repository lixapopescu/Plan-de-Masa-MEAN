'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    mongoose = require('mongoose'),
    Recipes = mongoose.model('Recipes'),
    Planning = mongoose.model('Planning');

function generateRandomRecipe(req, res){
    Recipes.count({}, function(err, count) {
        var rnd = _.random(0, count - 1);
        // console.log(count, rnd);
        //lean() to transform MongooseDocument(readonly) to json
        Recipes.findOne({
            $or: [{
                archived: 0
            }, {
                archived: {
                    $exists: false
                }
            }]
        }).limit(-(rnd + 1)).skip(rnd).limit(1).lean().exec(function(err, data) {
            if (!err) {
                data.fromRequest = {
                    year: req.params.year,
                    month: req.params.month,
                    day: req.params.day,
                    index: req.params.index
                };
                // console.log('randomrecipe', data);
                //got recipe, now attach to date
                Planning.findOneAndUpdate({
                    username: req.user.username,
                    date: new Date(req.params.year, req.params.month - 1, req.params.day)
                }, {
                    recipe: data
                }, {
                    upsert: true,
                    new: true
                }).exec(function(errPlan, plan) {
                    // console.log('randomrecipe.plan', errPlan, plan);
                    if (!errPlan) {
                        res.json(plan);
                    } else {
                        res.status(400).send({
                            message: errorHandler.getErrorMessage(errPlan)
                        });
                    }
                });
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
        });
    });    
}

//req parameters: year, month, day, index
//gets current recipe for date or generates & upserts a random one
exports.random = function(req, res) {
    console.log('random recipes.random.server.controller', req.params.year, req.params.month, req.params.day, req.params.index);

    Planning.findOne({
        date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
        username: req.user.username
    }, function (err, plan){
        if (!err) {
            //if didn't find any planning for the date+user => generate random
            console.log('err/plan', err, plan);
            if (!plan){
                generateRandomRecipe(req, res);
            }
            else {
                res.json(plan);
            }
        } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            }
    });
};
