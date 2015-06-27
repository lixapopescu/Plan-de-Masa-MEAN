'use strict';

var daysString = 'zile';
var space = ' ';
var recipeImagesPath = '/assets/recipes/';
var filenameSeparator = '_';

var getDistanceLabel = function(day) {
    return day.dayDistanceLabel +
        space +
        (day.dayDistanceRelativeToToday ? (Math.abs(day.dayDistance) + space + daysString) : '');
};

var setGlobalPlan = function(dailyPlans) {
    // console.log('dailyPlans', dailyPlans);
    var plan = {};

    var firstDay =
        _.chain(dailyPlans)
        .sortBy(function(d) {
            return d.date;
        })
        .first()
        .value();
    var lastDay =
        _.chain(dailyPlans)
        .sortBy(function(d) {
            return d.date;
        })
        .last()
        .value();

    plan.start = {
        dayLabel: firstDay.dayLabel,
        distanceLabel: getDistanceLabel(firstDay)
    };
    plan.last = {
        dayLabel: lastDay.dayLabel,
        distanceLabel: getDistanceLabel(lastDay)
    };

    return plan;
};

var imageSizesGenerator = function(dailyPlans, width, height, dpr) {
    _.each(dailyPlans, function(dailyPlan) {
        var recipe = dailyPlan.recipe;
        // dailyPlan.recipe.image = dailyPlan.recipe.image ? (recipeImagesPath + dailyPlan.recipe.image) : dailyPlan.recipe.origin.image; //my photo has priority

        //if a local image exists, then process it
        if (recipe.image) {
            var spl = recipe.image.split('.');
            var ext = _.last(spl); //extension
            var filename = _.initial(spl);
            recipe.picture = {
                sm: recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + filenameSeparator + 'sm' + '.' + ext,
                md: recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + filenameSeparator + 'md' + '.' + ext,
                lg: recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + filenameSeparator + 'lg' + '.' + ext,
                gt_lg: recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + filenameSeparator + 'gt_lg' + '.' + ext,
            };
            recipe.image = recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + '.' + ext;
            // console.log(recipe.title, recipe.picture);
        }
        //else just return remote image 
        else {
            recipe.image = recipe.origin.image;
        }
    });
};

angular.module('planning').controller('RecipesController', ['$scope', '$stateParams', 'Recipes',
    function($scope, $stateParams, Recipes) {
        // console.log('in RecipesController');
        Recipes.query({
                start_year: $stateParams.start_year,
                start_month: $stateParams.start_month,
                start_day: $stateParams.start_day,
                end_year: $stateParams.end_year,
                end_month: $stateParams.end_month,
                end_day: $stateParams.end_day
            },
            function(data) {
                // console.log('data', data, data[0]);
                //if the Array returned is actually an array of objects or just a empty promise 
                if (data[0]) {
                    imageSizesGenerator(data, 250, 300);
                    $scope.dailyPlans = data;
                    $scope.globalPlan = setGlobalPlan($scope.dailyPlans);
                }
                else {
                    $scope.noPlan = true;
                }
                // console.log('recipes', $scope.dailyPlans);
            },
            function(err) {
                //handle error
            });

        $scope.Math = window.Math;
        $scope.getDistanceLabel = getDistanceLabel;
    }
]);
