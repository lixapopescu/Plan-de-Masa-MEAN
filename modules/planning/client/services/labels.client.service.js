'use strict';

function mixinLabels(data) {
    _.each(data, function(item) {
        item.value = item._id.toLowerCase().latinise();
        item.display = item._id;
    });
    return data;
}

// Recipe Labels service used for communicating with the users REST endpoint
angular.module('planning').factory('Labels', ['$resource',
    function($resource) {
        return $resource('api/labels', {}, {
            query: {
                method: 'GET',
                isArray: true,
                cache: true,
                transformResponse: function(data, header) {
                    data = JSON.parse(data);
                    return mixinLabels(data);
                }
            }
        });
    }
]);
