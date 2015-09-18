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

function getAutocompleteItems(searchText) {
    return ['pui', 'paste', 'acru', 'picnic', 'de vara'];
}

/**
 * Create filter function for a query string. Match anywhere in the string (>=0 condition)
 */
function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    // $log.info(query);
    return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) >= 0);
    };
}



angular.module('planning').controller('RecipesController', ['$scope', '$rootScope', '$stateParams', '$q', '$timeout', '$state', '$log', 'Recipes', 'Labels',
    function($scope, $rootScope, $stateParams, $q, $timeout, $state, $log, Recipes, Labels) {
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

        //*********************************************************
        Labels.query({},
            function(data) {
                // console.log('Labels', data);
                $scope.labels = data;
            },
            function(err) {
                //handle err
            });

        $scope.thisLabel = $scope.labels;


        var self = this;
        $scope.selectedLabels = [];
        // ******************************
        // Internal methods
        // ******************************

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
            // $scope.selectedLabels.push(item);
            $scope.thisLabel.pull(item);
        }

        self.selectedItemChange = selectedItemChange;
        self.querySearch = querySearch;
        // self.searchTextChange = searchTextChange;

        /**
         * Return results for autocomplete list
         */
        function querySearch(query) {
            var results = query ? $scope.labels.filter(createFilterFor(query)) : $scope.labels;
            return results;
        }




        //*********************************************************




        $scope.Math = window.Math;
        $scope.getDistanceLabel = getDistanceLabel;
        $scope.changeInterval = changeInterval;
        $scope.autocomplete = {
            enabled: true,
            noCache: false,
            searchText: '',
            selectedItem: '',
            // selectedItemChange: selectedItemChange,
            // searchTextChange: searchTextChange,
            // querySearch: querySearch
        };

        $rootScope.$on('interval.change', function(event, interval) {
            $scope.date = interval;
        });

        // $scope.$watch('date', function(interval) {
        //     console.log('New date set: ', interval);
        //     // generatePlan($scope.date, $scope.globalPlan, $scope.dailyPlans, $scope.RandomRecipeService);
        // }, false);
    }
]);
