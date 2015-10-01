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

function buildRecipeQuery(filters, existingRecipeTitle) {
  console.log('existingRecipeTitle', filters, existingRecipeTitle);
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
  query.where('title').ne(existingRecipeTitle);
  return query;
}

function getRandomRecipe(req, res, existingRecipeTitle) {

  mongoose.set('debug', true);

  var filters = req.params.filters ? decodeURI(req.params.filters).split(',') : null;
  // console.log('filters received ', req.params, filters);

  // var recipeQuery = buildRecipeQuery(filters, existingRecipeTitle);

  buildRecipeQuery(filters, existingRecipeTitle).count().exec(function (err, count) {
    var rnd = _.random(0, count - 1);
    console.log('rnd,count', rnd, count);

    /**
     * Find a random recipe, non-archived, with lables matching ALL
     * If there is such a recipe, it upserts into the dababase
     * @param  {[type]} {                                                     $or: [{                          archived: 0                         } [description]
     * @param  {[type]} {                                                               archived: {                              $exists: false                              }            }] [description]
     * @param  {[type]} labels: {$all:        filters}        } [description]
     * @return {[type]}         [description]
     */
    buildRecipeQuery(filters, existingRecipeTitle)
      .limit(-(rnd + 1)).skip(rnd).limit(1)
      .lean() // to transform MongooseDocument(readonly) to json
      .exec(function (err, randomRecipe) {
        console.log('randomQuery', err, randomRecipe);
        if (!err) {
          if (randomRecipe) {
            randomRecipe.fromRequest = {
              year: req.params.year,
              month: req.params.month,
              day: req.params.day,
              index: req.params.index,
              filters: filters
            };
            // console.log('randomrecipe', randomRecipe);
            //got recipe, now attach to date
            // console.log('user: ', req.user);
            Planning.findOneAndUpdate({
              username: req.user.username,
              date: new Date(req.params.year, req.params.month - 1, req.params.day)
            }, {
              recipe: randomRecipe
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
            console.log('No recipe found');
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
  console.log('Route: random', req.params);
  Planning.findOne({
    $or: [{
      archived: 0
    }, {
      archived: {
        $exists: false
      }
    }],
    username: req.user.username,
    date: new Date(req.params.year, req.params.month - 1, req.params.day)
  }).exec(function (err, existingRecipe) {
    console.log('result ', err, existingRecipe);
    if (existingRecipe) getRandomRecipe(req, res, existingRecipe.recipe.title);
    else getRandomRecipe(req, res, null);
  });
};
