'use strict';

// Singular service used for communicating with the planning REST endpoint
/**
 * Singular service used to communicate with the REST endpoint
 * Queries for a random recipe, constricted by filters (if any)
 * @param  {Number} 'index' Index in the planning. Passed to the server and received back again in order to have it available when the promise is finished
 * @param  {Number} 'year' Year for which the recipe is requested
 * @param  {Number} 'month' Month for which the recipe is requested
 * @param  {Number} 'day' Day for which the recipe is requested
 * @param  {Array<String>} 'filters' Array of URI encoded strings. Used to narrow down the recipes
 * @return {Json}            A Recipe json object, filled in with meaningful data for the client from mixinRecipe()
 */
angular.module('planning').factory('RandomRecipe', ['$resource',
  function ($resource) {
    return $resource('/api/recipes/random/:index/:year/:month/:day/:filters', {}, {
      get: {
        method: 'GET',
        transformResponse: function (data, header) {
          // console.log('in random recipe factory', data);
          data = JSON.parse(data);
          if (!data.recipe.image) data.recipe.image = data.recipe.origin.image;
          // console.log('RandomRecipeService', data.recipe.fromRequest);
          return mixinRecipe(data);
        }
      }
    });
  }
]);
