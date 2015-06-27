'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', '$stateParams',
    function($scope, $http, $location, Authentication, $stateParams) {
        $scope.authentication = Authentication;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/');

        // switch ($location.path()){
        // 	case '/authentication/signup': $scope.welcomeMessage = 'Inregistrare'; break;
        // 	case '/authentication/signin': $scope.welcomeMessage = 'Contul meu';
        // }

        // console.log('auth-cont', $location.path(), $scope.welcomeMessage);

        console.log('$stateParams', $stateParams);


        $scope.signup = function() {
        	$scope.credentials.username = $scope.credentials.email; //email as username. don't confuse the user :)
            $http.post('/api/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                if ((response.message === 'Email deja există') || (response.message === 'Username deja există')) {
                	response.message = 'Emailul deja există';
                    $scope.errorCode = 11010;
                } 
                else {
                    $scope.errorCode = 0;
                }
                $scope.error = response.message;
            });
        };

        $scope.signin = function() {
        	$scope.credentials.username = $scope.credentials.email; //email as username. don't confuse the user :)
            $http.post('/api/auth/signin', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                $scope.welcomeMessage = 'Bună';

                // And redirect to the index page
                $location.path('/');

            }).error(function(response) {
                if (response.message === 'Missing credentials'){
                	response.message = 'Email sau parolă incorectă';
                }
                $scope.error = response.message;
            });
        };
    }
]);
