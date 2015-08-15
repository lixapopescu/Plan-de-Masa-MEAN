'use strict';

angular.module('planning').controller('CalendarController', ['$scope', '$stateParams', '$rootScope',
    function($scope, $stateParams, $rootScope) {

        $scope.$watch('date', function(interval) {
            $rootScope.$emit('interval.change', interval);
        }, false);

    }
]);
