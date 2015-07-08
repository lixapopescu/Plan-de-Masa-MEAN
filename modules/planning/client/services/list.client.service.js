'use strict';

var fillCustomAttributesList = function(list) {
    console.log('fillCustomAttributesList');
    _.each(list, function(categ) {
    	// console.log('categ', categ);
        _.each(categ.ingredients, function(item) {
            item.bought = false;
            item.foldable = true; //TODO: remove when recipes are added
        });
        categ.folded = true;
    });
};

var mixinList = function(data){
	var d = data;
	// console.log('---d:', d);
	fillCustomAttributesList(d);
	return d;
};

// List service used for communicating with the users REST endpoint
angular.module('planning').factory('List', ['$resource',
    function($resource) {
        return $resource('api/list/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day', {}, {
        	query: {
        		method: 'GET',
        		isArray: true,
        		transformResponse: function(data, header){
        			// console.log('in list factory', data, header)
        			data = JSON.parse(data);
        			return mixinList(data);
        		}
        	}
        });
    }
]);
