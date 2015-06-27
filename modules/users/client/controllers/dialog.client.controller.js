'use strict';

angular.module('users').controller('AuthenticationDialogController', ['$scope', '$location',
    function($scope, $location) {
        var signInRegex = /authentication\/signin$/;
        var signUpRegex = /authentication\/signup$/;

        switch ($location.path()) {
            case '/authentication/signup':
                $scope.welcomeMessage = 'Înregistrare';
                break;
            case '/authentication/signin':
                $scope.welcomeMessage = 'Contul meu';
        }

        $scope.$on('$locationChangeStart', function(event, next, current) {
            if (signInRegex.exec(next))
                $scope.welcomeMessage = 'Contul meu';
            else if (signUpRegex.exec(next))
                $scope.welcomeMessage = 'Înregistrare';
        });

    }
]);
