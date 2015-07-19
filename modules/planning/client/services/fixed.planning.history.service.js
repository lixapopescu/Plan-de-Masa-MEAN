'use strict';

// Recipes service used for communicating with the users REST endpoint
angular.module('planning').factory('FixedPlanningHistory', ['$resource',
    function($resource) {
        return $resource('api/fixedplanning', {}, {
            getAll: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, header) {
                    // console.log('FixedPlanningHistory service', data);
                    data = JSON.parse(data);
                    return mixinFixedPlanningHistory(data);
                }
            }
        });
    }
]);
