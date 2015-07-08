'use strict';

// Recipes service used for communicating with the users REST endpoint
angular.module('planning').factory('Recipes', ['$resource',
    function($resource) {
        return $resource('api/recipes/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, header) {
                    data = JSON.parse(data);
                    return mixinRecipes(data);
                }
            }
        });
    }
]);
