'use strict';

angular.module('planning').controller('PlanHistoryController', ['$scope', '$state', 'FixedPlanningHistory',
    function($scope, $state, FixedPlanningHistory) {
    	$scope.DATE_FORMAT = DATE_FORMAT;

        FixedPlanningHistory.getAll({},
            function(data) {
                console.log(data);
                //if not just an empty promise
                if (data.length > 0){
                	$scope.plans = data;
                }
            },
            function(err) {});
    }
]);
