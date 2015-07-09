'use strict';

angular.module('core').controller('HomeController', ['$scope', '$state', 'Authentication',
    function($scope, $state, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;


        // console.log(Authentication);

        /**
         *   if authenticated ==> redirect to current plan
         *   else ==> redirect to sign up, for the moment 
         *           TODO: create homepage with action button for signin/up
         */
        if (Authentication.user) {
            var interval = {
                startDate: moment(),
                endDate: moment().add(6, 'days')
            };
            $state.go('top.plan.detail', {
                start_year: interval.startDate.year(),
                start_month: interval.startDate.month() + 1,
                start_day: interval.startDate.date(),
                end_year: interval.endDate.year(),
                end_month: interval.endDate.month() + 1,
                end_day: interval.endDate.date()
            });
        }
        else {
            $state.go('top.authentication.signup');
        }

    }
]);
