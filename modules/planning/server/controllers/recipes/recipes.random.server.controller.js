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

function buildRecipeQuery(filters){
  var query = Recipes.findOne({
    $or: [{
      archived: 0
    }, {
      archived: {
        $exists: false
      }
    }]
  });
  if (filters) query.where('labels').all(filters);
  //TODO: search for different recipe that the existing one. If only one, return status 300, and on clinet side live as it is

  return query;
}

function generateRandomRecipe(req, res) {
  var filters = decodeURI(req.params.filters).split(',');
  // console.log('filters received ', req.params, filters);
  mongoose.set('debug', true);

  var recipeQuery = buildRecipeQuery(filters);

  recipeQuery.count().exec(function (err, count) {
    var rnd = _.random(0, count - 1);
    // console.log('rnd,count', rnd, count);

    /**
     * Find a random recipe, non-archived, with lables matching ALL
     * If there is such a recipe, it upserts into the dababase
     * @param  {[type]} {                                                     $or: [{                          archived: 0                         } [description]
     * @param  {[type]} {                                                               archived: {                              $exists: false                              }            }] [description]
     * @param  {[type]} labels: {$all:        filters}        } [description]
     * @return {[type]}         [description]
     */
    buildRecipeQuery(filters)
      .limit(-(rnd + 1)).skip(rnd).limit(1)
      .lean() // to transform MongooseDocument(readonly) to json
      .exec(function (err, data) {
        if (!err) {
          if (data) {
            data.fromRequest = {
              year: req.params.year,
              month: req.params.month,
              day: req.params.day,
              index: req.params.index,
              filters: filters
            };
            // console.log('randomrecipe', data);
            //got recipe, now attach to date
            // console.log('user: ', req.user);
            Planning.findOneAndUpdate({
              username: req.user.username,
              date: new Date(req.params.year, req.params.month - 1, req.params.day)
            }, {
              recipe: data
            }, {
              upsert: true,
              new: true
            }).exec(function (errPlan, plan) {
              // console.log('randomrecipe.plan', errPlan, plan);
              if (!errPlan) {
                res.json(plan);
              } else {
                res.status(400).send({
                  message: errorHandler.getErrorMessage(errPlan)
                });
              }
            });
          }
          //no recipe found
          else {
            res.status(300).send({
              message: 'No recipe found'
            });
          }
        } else {
          res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
      });
  });
}

//req parameters: year, month, day, index
//generates & upserts a random recipe
/**
 * Generates and upsets a random recipe
 * @param  {Number} req.year Year for which the recipe is requested for
 * @param  {Number} req.month Month for which the recipe is requested for
 * @param  {Number} req.day Day for which the recipe is requested for
 * @param  {Number} req.index Index in the planning. To be passed unprocessed back to the client, in order to keep track of the requested throughout the promise fulfillment
 * @param  {Array<String>} req.filters List of filters/criteria for the recipe. Passed as comma delimited strings, URI-encoded
 * @return {Json}   A recipe + the parameters from the request
 */
exports.random = function (req, res) {

  generateRandomRecipe(req, res);

  // Planning.findOne({
  //     date: Utils.getDateFromString(req.params.year, req.params.month, req.params.day),
  //     username: req.user.username
  // }, function (err, plan){
  //     if (!err) {
  //         //if didn't find any planning for the date+user => generate random
  //         if (!plan){
  //             generateRandomRecipe(req, res);
  //         }
  //         else {
  //             res.json(plan);
  //         }
  //     } else {
  //             res.status(400).send({
  //                 message: errorHandler.getErrorMessage(err)
  //             });
  //         }
  // });
};
