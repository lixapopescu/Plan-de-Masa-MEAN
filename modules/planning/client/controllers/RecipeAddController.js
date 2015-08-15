'use strict';

angular.module('planning').controller('RecipeAddController', ['$scope',
    function($scope) {
    	console.log('RecipeAddController');
    	$scope.recipe = {
    		title: 'Titlu'
    	};
    }
]);
