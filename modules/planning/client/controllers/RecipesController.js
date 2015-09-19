'use strict';

/**
 * Create filter function for a query string. Match anywhere in the string (>=0 condition)
 */
function createFilterFor(query) {
  var lowercaseQuery = angular.lowercase(query);
  return function filterFn(state) {
    return (state.value.indexOf(lowercaseQuery) >= 0);
  };
}

angular.module('planning').controller('RecipesController', ['$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$state', '$log', 'Recipes', 'Labels',
  function ($scope, $rootScope, $stateParams, $q, $timeout, $state, $log, Recipes, Labels) {
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
   * Retrieve labels RESTful API through Angular service 'Label'
   * @param  {Query Parameters} {}       Query all labels available
   * @return {autocomplete.labels}          Fill in labels for autocomplete
   */
    Labels.query({},
      function (data) {
        $scope.autocomplete.labels = data;
      },
      function (err) {
        //handle err
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

    /**
     * Autocomplete object for use in md-autocomplete. Groups all general settings
     * @type {Json}
     */
    $scope.autocomplete = {
      readonly: false,
      selectedItem: null,
      searchText: null,
      querySearch: querySearch,
      selectedItemChange: selectedItemChange,
      selectedLabels: []
    };

    /**
     * Called each time an item is added in autocomplete
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    function selectedItemChange(item) {
      $log.info('selectedLabels ' + $scope.autocomplete.selectedLabels.length);
      // var obj = $scope.autocomplete.selectedLabels[0];
      // if (obj) $log.info('name: ' + obj['name']);
      // if (item) {
      //   $log.info('Item changed to ' + JSON.stringify(item));
      //   if (item.$$hashKey)
      //     $log.info('Used before ' + item.name);
      // }
    }

    /**
     * Generate autocomplete query.
     */
    function querySearch(query) {
      return query ? $scope.autocomplete.labels.filter(createFilterFor(query)) : [];
    }

  }
]);
