'use strict';

function gotoRecipePlanning($state, interval) {
    $state.go('top.plan.detail', {
        start_year: interval.startDate.year(),
        start_month: interval.startDate.month() + 1,
        start_day: interval.startDate.date(),
        end_year: interval.endDate.year(),
        end_month: interval.endDate.month() + 1,
        end_day: interval.endDate.date()
    });
}

function gotoSettings($state) {
    $state.go('top.settings.profile');
}

function gotoPlanHistory($state){
    $state.go('top.planHistory');
}

angular.module('core').controller('HeaderController', ['$scope', '$state', 'Authentication', 'Menus',
    function($scope, $state, Authentication, Menus) {
        // Expose view variables
        $scope.$state = $state;
        $scope.authentication = Authentication;
        $scope.gotoRecipePlanning = gotoRecipePlanning;
        $scope.gotoSettings = gotoSettings;
        $scope.gotoPlanHistory = gotoPlanHistory;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function() {
            $scope.isCollapsed = false;
        });

        $scope.interval = {
            startDate: moment(),
            endDate: moment().add(6, 'days')
        };
    }
]);
