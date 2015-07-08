'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$stickyStateProvider',
    function($stateProvider, $urlRouterProvider, $stickyStateProvider) {
        // Redirect to home view when route not found
        $urlRouterProvider.otherwise('/');
        // $stickyStateProvider.enableDebug(true);

        // Home state routing
        $stateProvider
            .state('top', {
                abstract: true,
                sticky: true, //sticky, to remain in DOM while modal is focused on top
                url: '/',
                views: {
                    //named view, needed for stickyState
                    //http://stackoverflow.com/questions/26216661/modal-dialog-using-ui-router-from-any-parent-how-to-correctly-specify-state 
                    'top': {
                        template: '<div ui-view></div>',
                        controller: 'HomeController'
                    }
                }
            });

    }
]);

// $stateProvider.
// state('home', {
// 	url: '/',
// 	templateUrl: 'modules/core/views/home.client.view.html'
// });
