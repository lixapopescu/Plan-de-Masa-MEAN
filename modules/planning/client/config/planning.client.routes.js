'use strict';

// Setting up route
angular.module('planning').config(['$stateProvider', '$stickyStateProvider',
    function($stateProvider, $stickyStateProvider) {
        $stickyStateProvider.enableDebug(true);

        $stateProvider
            .state('top.plan', {
                abstract: true,
                templateUrl: 'modules/planning/views/display/display.client.view.html',
            })
            .state('top.plan.detail', {
                url: '/plan/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day',
                views: {
                    'recipes': {
                        templateUrl: 'modules/planning/views/display/recipes.client.view.html'
                    },
                    'list': {
                        templateUrl: 'modules/planning/views/display/list.client.view.html'
                    }
                }
            })
            .state('top.generatePlan', {
                url: '/plan_nou',
                templateUrl: 'modules/planning/views/generate/plan.client.view.html',
                controller: 'GeneratePlanController'
            })
            .state('top.planHistory',{
                url: '/plan/istoric',
                templateUrl: 'modules/planning/views/display/plan.history.client.view.html',
                controller: 'PlanHistoryController'
            })
            .state('top.recipeAdd',{
                url:'/retete/adauga',
                templateUrl:'modules/planning/views/admin/recipe.add.client.view.html',
                controller: 'RecipeAddController'
            })
            .state('retetaModal', {
                url: '/reteta/:year/:month/:day/:url',
                controller: 'RecipeModalInstanceController',
                params: {
                    recipe: null,
                },
                // template: '<div ui-view></div>',
                resolve: {
                    recipe: function($stateParams) {
                        console.log('stateParams', $stateParams);
                        return $stateParams.recipe;
                    }
                },
                proxy: { // Custom config processed in $stateChangeStart
                    external: 'retetaModal.full',
                    internal: 'retetaModal.modal'
                }
            })
            .state('retetaModal.modal', {
                views: {
                    'modal@': {
                        templateUrl: 'modules/planning/views/modals/recipe.client.view.html',
                        controller: 'RecipeModalInstanceController'
                    }
                },
                isModal: true // Custom config processed in $stateChangeStart
            })
            .state('retetaModal.full', {
                views: {
                    '@': {
                        templateUrl: 'modules/planning/views/modals/recipe.full.client.view.html',
                        controller: 'RecipeModalInstanceController'
                    }
                }
            });
    }
]);
