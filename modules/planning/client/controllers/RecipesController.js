'use strict';

function DialogCalendarController($scope, $mdDialog, date) {
  $scope.date = date;
  moment.locale('ro');
  $scope.opts = CALENDAR_OPTIONS;
  console.log('$scope.date', $scope.date);
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
angular.module('planning').controller('RecipesController', ['$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$state', '$mdDialog', 'Recipes',
  function ($scope, $rootScope, $stateParams, $q, $timeout, $state, $mdDialog, Recipes) {
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

    //Interval is disabled => hide icon to make place for menu
    $scope.calendarDisabled = true;

    /**
     * Options menu
     */
    var originatorEv;

    $scope.changeInterval = function () {
      console.log('changeInterval');
      $mdDialog.show({
          controller: DialogCalendarController,
          templateUrl: '/modules/planning/views/parts/calendar.dialog.client.view.html',
          parent: angular.element(document.body),
          targetEvent: originatorEv,
          clickOutsideToClose: true,
          ariaLabel: 'Ce plan vrei să vezi acum',
          locals: {
            date: $scope.date
          },
          ok: 'Gata'
        })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.toggleFreeDaysVisible = function () {
      $scope.freeDaysVisible = !$scope.freeDaysVisible;
    };
    $scope.freeDaysVisible = true;
    $scope.openMenu = function ($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    /**
     * Watch interval change on date-picker. Necessary because the date-picker snippet is in another view
     * @return {Json}     Updates the date object from $scope
     */
    $rootScope.$on('interval.change', function (event, interval) {
      $scope.date = interval;
    });

    $scope.Math = window.Math;
    $scope.getDistanceLabel = getDistanceLabel;
    // $scope.changeInterval = changeInterval;


  }
]);
