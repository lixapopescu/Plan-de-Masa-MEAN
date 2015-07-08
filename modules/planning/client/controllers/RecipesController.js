'use strict';

function changeInterval(intervalFromScope, interval) {
    console.log(interval);
    intervalFromScope = interval;
    // $state.go('top.plan.detail', {
    //     start_year: interval.startDate.year(),
    //     start_month: interval.startDate.month() + 1,
    //     start_day: interval.startDate.date(),
    //     end_year: interval.endDate.year(),
    //     end_month: interval.endDate.month() + 1,
    //     end_day: interval.endDate.date()
    // });

}

angular.module('planning').controller('RecipesController', ['$scope', '$rootScope', '$stateParams', '$state', 'Recipes', 
    function($scope, $rootScope, $stateParams, $state, Recipes) {
        console.log('in RecipesController', $stateParams, $scope.$id);
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
                // console.log(data);
                if (data[0]) {
                    // console.log('RecipesController', data);
                    $scope.dailyPlans = data;
                    $scope.date = getInterval($scope.dailyPlans); //for calendar input control
                    moment.locale('ro');
                    $scope.opts = CALENDAR_OPTIONS;
                } else {
                    $scope.noPlan = true;
                }
            },
            function(err) {
                //handle error
            });

        $scope.Math = window.Math;
        $scope.getDistanceLabel = getDistanceLabel;
        $scope.changeInterval = changeInterval; 

        $rootScope.$on('interval.change', function(event, interval){
            console.log('rootscope.on', event, interval);
            $scope.date = interval;
        });

        // $scope.$watch('date', function(interval) {
        //     console.log('New date set: ', interval);
        //     // generatePlan($scope.date, $scope.globalPlan, $scope.dailyPlans, $scope.RandomRecipeService);
        // }, false);
    }
]);
