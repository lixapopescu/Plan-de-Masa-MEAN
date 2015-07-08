'use strict';

angular.module('planning').controller('CalendarController', ['$scope', '$stateParams', '$rootScope',
    function($scope, $stateParams, $rootScope) {
        // console.log('in CalendarController', $stateParams);
        $scope.$watch('date', function(interval) {
            // console.log('New date set calendar: ', interval);
            $rootScope.$emit('interval.change', interval);
        }, false);

    }
]);
