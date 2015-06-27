'use strict';

var path = '/';

// var generatePlan = function(interval, globalPlan, dailyPlans, RandomRecipeService) {
//     console.log('generatePlan', interval);
//     var duration = moment.duration(interval.endDate.diff(interval.startDate));
//     globalPlan.numberOfDays = parseInt(duration.format('d')) + 1;
//     // console.log(dailyPlans.numberOfDays);
//     for (var i = 0; i < globalPlan.numberOfDays; i++) {
//         dailyPlans[i] = {};
//         dailyPlans[i].date = interval.startDate.add(i, 'days').toDate();
//         console.log('date', dailyPlans[i].date);
//         RandomRecipeService.get({},
//             function(data) {
//                 console.log(i, dailyPlans[i], data, $scope.date);
//                 dailyPlans[i].recipe = data;
//             },
//             function(err) {
//                 //callback(err, null);
//             });
//     }
//     console.log('dailyPlans', dailyPlans);
// };

//Recipe = factory for recipe on single day
//recipes = state parameter passed to modal
angular.module('planning').controller('GeneratePlanController', ['$scope', 'RandomRecipe',
    function($scope, RandomRecipe) {
        console.log('GeneratePlanController');
        //TODO !!! if not authenticated, redirect to homepage

        $scope.dailyPlans = [];
        $scope.globalPlan = {};

        function putRandomRecipe(i, data) {
            console.log('i+dta', i, data);
            $scope.dailyPlans[i].recipe = data;
        }

        function putRandomRecipeFactory(i, data) {
            console.log('factory', i, data);
            return function() {
                putRandomRecipe(data);
            };
        }

        $scope.generatePlan = function(interval, globalPlan, dailyPlans) {
            console.log('generatePlan', interval, dailyPlans);
            var duration = moment.duration(interval.endDate.diff(interval.startDate));
            globalPlan.numberOfDays = parseInt(duration.format('d')) + 1;
            // console.log(dailyPlans.numberOfDays);

            for (var i = 0; i < globalPlan.numberOfDays; i++) {
                dailyPlans[i] = {};
                dailyPlans[i].date = interval.startDate.add(i, 'days').toDate();
                dailyPlans[i].dateJson = dailyPlans[i].date.toJson();
                var putFunc = putRandomRecipeFactory(i);
                (function(i) {
                    RandomRecipe.get({
                            year: dailyPlans[i].dateJson.year,
                            month: dailyPlans[i].dateJson.month,
                            day: dailyPlans[i].dateJson.day,
                            index: i
                        },
                        function(data) {
                            putRandomRecipe(i, data);
                        },
                        function(err) {
                            //callback(err, null);
                        });
                })(i);
            }
        };
        $scope.RandomRecipeService = RandomRecipe;

        $scope.date = {
            startDate: moment(),
            endDate: moment().add(6, 'days')
        };

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        //     RandomRecipe.find({},
        // function(data) {
        //     console.log(i, data, dailyPlans[i]);
        //     dailyPlans[i].recipe = data;
        // },
        // function(err) {
        //     //callback(err, null);
        // });



        // $scope.date2 = {
        //     startDate: moment().subtract('days', 1),
        //     endDate: moment()
        // };

        moment.locale('ro');

        $scope.opts = {
            locale: {
                applyClass: 'btn-green',
                applyLabel: 'Gata',
                fromLabel: 'de la',
                toLabel: 'până la',
                cancelLabel: 'Înapoi',
                customRangeLabel: 'Cum vreau eu',
                daysOfWeek: ['Du', 'Lu', 'Ma', 'Mi', 'J', 'Vi', 'Sâ'],
                firstDay: 1,
                monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie',
                    'Octombrie', 'Noiembrie', 'Decembrie'
                ]

            },
            format: 'dd DD MMMM',
            ranges: {
                'De azi': [moment(), moment().add(6, 'days')],
                'De mâine': [moment().add(1, 'days'), moment().add(7, 'days')],
                'Săptămâna viitoare': [moment().day(8), moment().day(8).add(6, 'days')]
            }
        };

        //Watch for date changes
        $scope.$watch('date', function(newDate) {
            console.log('New date set: ', newDate);
        }, false);

    }
]);
