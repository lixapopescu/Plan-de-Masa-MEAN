'use strict';

angular.module('planning').controller('RecipesController', ['$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$state', 'Recipes',
  function ($scope, $rootScope, $stateParams, $q, $timeout, $state, Recipes) {
    console.log('in RecipesController', $stateParams, $scope.$id);

    /**
     * Call the Recipe service to retrieve the recipes coresponding to the interval selected in $stateParams
     * @return {Array<Json>}              fills in dailyPlans from $scope
     */
    Recipes.query({
        start_year: $stateParams.start_year,
        start_month: $stateParams.start_month,
        start_day: $stateParams.start_day,
        end_year: $stateParams.end_year,
        end_month: $stateParams.end_month,
        end_day: $stateParams.end_day
      },
      function (data) {
        //if the Array returned is actually an array of objects or just a empty promise
        if (data[0]) {
          $scope.dailyPlans = data;
          $scope.date = getInterval($scope.dailyPlans); //for calendar input control
          moment.locale('ro');
          $scope.opts = CALENDAR_OPTIONS;
        } else {
          $scope.noPlan = true;
        }
      },
      function (err) {
        //handle error
      });

    /**
     * Watch interval change on date-picker. Necessary because the date-picker snippet is in another view
     * @return {Moment}                   Updates the date object from $scope
     */
    $rootScope.$on('interval.change', function (event, interval) {
      $scope.date = interval;
    });

    $scope.Math = window.Math;
    $scope.getDistanceLabel = getDistanceLabel;
    // $scope.changeInterval = changeInterval;


  }
]);
