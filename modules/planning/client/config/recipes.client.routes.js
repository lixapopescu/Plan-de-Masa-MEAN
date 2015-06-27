'use strict';

// Setting up route
angular.module('planning').config(['$stateProvider', '$stickyStateProvider',
    function($stateProvider, $stickyStateProvider) {
        $stickyStateProvider.enableDebug(true);

        $stateProvider
            .state('recipes', {
                abstract: true,
                url: '/retete',
                templateUrl: 'modules/planning/views/display/display.client.view.html'
            })
            .state('recipes.week', {
                url: '/retetele_saptamanale',
                templateUrl: 'modules/planning/views/week/week.client.view.html'
            });
    }
]);
