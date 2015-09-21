'use strict';

// Recipes service used for communicating with the users REST endpoint
angular.module('planning').factory('FixedPlanning', ['$resource',
    function($resource) {
        return $resource('api/fixedplanning/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day', {}, {
            get: {
                method: 'GET',
                isArray: false,
                transformResponse: function(data, header) {
                    data = JSON.parse(data);
                    return data;
                }
            },
            update: {
      				method: 'PUT'
      			}
        });
    }
]);
