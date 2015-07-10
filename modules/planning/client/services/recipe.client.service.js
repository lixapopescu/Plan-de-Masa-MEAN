'use strict';

// Singular service used for communicating with the users REST endpoint
angular.module('planning').factory('Recipe', ['$resource',
    function($resource) {
        return $resource('/api/recipes/:year/:month/:day/:recipe_url', {}, {
            find: {
                method: 'GET',
                transformResponse: function(data, header) {
                    // console.log('in Recipe factory', data);
                    data = JSON.parse(data);
                    if (data) {
                        if (!data.recipe.image) data.recipe.image = data.recipe.origin.image;
                        return mixinRecipe(data);
                    } else return data;
                }
            },
            delete: {
                method: 'DELETE'
            }
        });
    }
]);
