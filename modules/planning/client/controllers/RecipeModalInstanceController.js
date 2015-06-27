'use strict';

var path = '/';


//Recipe = factory for recipe on single day
//recipse = state parameter passed to modal
angular.module('planning').controller('RecipeModalInstanceController', ['$http', '$scope', 'Recipe', 'recipe', '$stateParams', 
    function($http, $scope, Recipe, recipe, $stateParams) {

        console.log('RecipeModalInstanceController', $scope.user);
        if (!!recipe) {
            //modal display
            $scope.recipe = recipe;

        } else {
            //full display
            Recipe.find({
                    year: $stateParams.year,
                    month: $stateParams.month,
                    day: $stateParams.day,
                    recipe_url: $stateParams.url
                },
                function(data) {
                    // console.log('data', data);
                    $scope.recipe = data;
                    console.log('recipe', $scope.recipe);
                },
                function(err) {
                    //handle error
                });
            $scope.year = $stateParams.year;
            $scope.month = $stateParams.month;
            $scope.day = $stateParams.day;
        }
    }
]);
