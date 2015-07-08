'use strict';


var toggleBought = function(product) {
    product.bought = !product.bought;
};

var toggleFolded = function(category) {
    // console.log('folded toggle', category._id, category.folded);
    category.folded = !category.folded;
};

var countBought = function(products) {
    return _.filter(products, {
        bought: true
    }).length;
};

angular.module('planning').controller('ListController', ['$scope', '$stateParams', 'List',
    function($scope, $stateParams, List) {
        // console.log('in ListController');
        List.query({
                start_year: $stateParams.start_year,
                start_month: $stateParams.start_month,
                start_day: $stateParams.start_day,
                end_year: $stateParams.end_year,
                end_month: $stateParams.end_month,
                end_day: $stateParams.end_day
            },
            function(data) {
                // console.log('data', data);
                $scope.list = data;
                // console.log('list', $scope.list);
            },
            function(err) {
                //handle error
            });
        // console.log('l', l);

        $scope.toggleBought = toggleBought;
        $scope.toggleFolded = toggleFolded;
        $scope.countBought = countBought;
        // $scope.animationsEnabled = true;
    }
]);
