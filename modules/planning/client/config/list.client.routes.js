'use strict';

// Setting up route
angular.module('planning').config(['$stateProvider', '$stickyStateProvider',
    function($stateProvider, $stickyStateProvider) {
        $stickyStateProvider.enableDebug(true);

        $stateProvider
            .state('list', {
                abstract: true,
                url: '/lista',
                templateUrl: 'modules/planning/views/display/display.client.view.html'
            })
            .state('list.week', {
                url: '/lista_saptamanala',
                templateUrl: 'modules/planning/views/week/week.client.view.html'
            });
    }
]);
