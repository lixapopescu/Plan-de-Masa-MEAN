'use strict';

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

angular.module('planning').controller('RecipesController', ['$scope', '$stateParams', 'Recipes',
    function($scope, $stateParams, Recipes) {
        console.log('in RecipesController', $stateParams);
        Recipes.query({
                start_year: $stateParams.start_year,
                start_month: $stateParams.start_month,
                start_day: $stateParams.start_day,
                end_year: $stateParams.end_year,
                end_month: $stateParams.end_month,
                end_day: $stateParams.end_day
            },
            function(data) {
                //if the Array returned is actually an array of objects or just a empty promise 
                console.log(data);
                if (data[0]) {
                    // console.log('RecipesController', data);
                    $scope.dailyPlans = data;
                    $scope.globalPlan = setGlobalPlan($scope.dailyPlans);
                }
                else {
                    $scope.noPlan = true;
                }
            },
            function(err) {
                //handle error
            });

        $scope.Math = window.Math;
        $scope.getDistanceLabel = getDistanceLabel;
    }
]);
