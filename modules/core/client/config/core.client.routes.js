'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider', '$stickyStateProvider', 
	function($stateProvider, $urlRouterProvider, $stickyStateProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
		// $stickyStateProvider.enableDebug(true);

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);