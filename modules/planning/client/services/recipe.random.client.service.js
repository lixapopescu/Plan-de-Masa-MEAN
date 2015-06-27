'use strict';

// Singular service used for communicating with the users REST endpoint
angular.module('planning').factory('RandomRecipe', ['$resource',
    function($resource) {
        return $resource('/api/recipes/random/:index/:year/:month/:day', {}, {
            get: {
                method: 'GET',
                transformResponse: function(data, header) {
                    // console.log('in random recipe factory', data);
                    data = JSON.parse(data);
                    if (!data.image) data.image = data.origin.image;
                    console.log('RandomRecipe', data.fromRequest);
                    return data;
                }
            }
        });
    }
]);
