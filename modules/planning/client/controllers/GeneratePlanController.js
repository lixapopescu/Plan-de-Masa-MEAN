'use strict';

var RECIPE_STATES = ['selected', 'noRecipe', 'toBeRefreshed'];
var OK_RECIPE = 0;
var NO_RECIPE = 1;
var ANOTHER_RECIPE = 2;
var DEFAULT_RECIPE_STATE = OK_RECIPE;

//save a random recipe
function saveRandomRecipe(dailyPlans, i, data, recipeStatus) {
    // console.log('i+dta', i, data);
    dailyPlans[i] = data;
    dailyPlans[i].statusIndex = recipeStatus;
}

//closure function to access loop index, which is outside the promise
function getRandomRecipe(dailyPlans, i, RandomRecipeService, recipeStatus) {
    (function(i) {
        RandomRecipeService.get({
                year: dailyPlans[i].dateJson.year,
                month: dailyPlans[i].dateJson.month,
                day: dailyPlans[i].dateJson.day,
                index: i
            },
            function(data) {
                saveRandomRecipe(dailyPlans, i, data, recipeStatus);
            },
            function(err) {
                //callback(err, null);
            });
    })(i);
}

//generate a recipe for a specific date
function generateDay(dailyPlans, i, date, RandomRecipeService, recipeStatus) {
    dailyPlans[i] = {};
    dailyPlans[i].date = date;
    dailyPlans[i].dateJson = dailyPlans[i].date.toJson();
    getRandomRecipe(dailyPlans, i, RandomRecipeService, recipeStatus);
}

//generate 1 recipe for each day of the interval, including start and end date
function generatePlan(interval, globalPlan, dailyPlans, RandomRecipeService) {
    var duration = moment.duration(interval.endDate.diff(interval.startDate));
    //create new moment object to not modify the original 'interval' object
    var startDate = moment(interval.startDate);
    globalPlan.numberOfDays = parseInt(duration.format('d')) + 1;

    for (var i = 0; i < globalPlan.numberOfDays; i++, startDate.add(1, 'days')) {
        generateDay(dailyPlans, i, startDate.toDate(), RandomRecipeService, DEFAULT_RECIPE_STATE);
    }
    // console.log('after loop', startDate, interval.startDate);
}

//generate plan after changes made by the user: 
//- remove a day from planning
//- change a recipe for a new one
//check for date changes
function regeneratePlan(interval, globaPlan, dailyPlans, RandomRecipeService) {
    //status changes (RECIPE_STATES)
    for (var i = 0; i < dailyPlans.length; i++) {
        if (dailyPlans[i] && dailyPlans[i].statusIndex === ANOTHER_RECIPE) {
            console.log('random for ', dailyPlans[i].recipe.title);
            getRandomRecipe(dailyPlans, i, RandomRecipeService, ANOTHER_RECIPE);
        }
    }
    //check for date changes TODO
    // if (interval.startDate != globalPlan.st)
}

//de-archive recipe 
function undeleteRecipe() {
    console.log('undelete TODO');
}

//archive recipe
//not doing Toasts, as I need to figure out a way to display info having only one toast shown at a time (not to overwhelm the screen <-- material design specs)
//in order to do that, I would need to call one Toast in the previous' .then function
function deleteRecipe(RecipeService, dailyPlans, i, year, month, day, url, title) {
    console.log('delete recipe', title);
    RecipeService.delete({
            year: year,
            month: month,
            day: day,
            recipe_url: url
        },
        function(data) {
            console.log('after delete');
            dailyPlans[i] = null;
            dailyPlans = _.compact(dailyPlans);
            console.log(dailyPlans);
            // showToastUndo(mdToast, 'Am şters reţeta ' + title, undeleteRecipe);
        },
        function(err) {
            console.log('In deleting recipe ', title, ' there was an error: ', err);
            // showToastSimple(mdToast, 'Nu am putut şterge reţeta ' + title + '. Mai incearcă o dată.');
        });
}

// function deletePlan(dailyPlans, RecipeService, mdToast) {
//     // console.log('deletePlan', dailyPlans.length);
//     for (var i = 0; i < dailyPlans.length; i++) {
//         deleteRecipe(RecipeService, dailyPlans, i, dailyPlans[i].dateJson.year, dailyPlans[i].dateJson.month, dailyPlans[i].dateJson.day, dailyPlans[i].recipe.url, dailyPlans[i].recipe.title, mdToast);
//     }
// }

//change status with states from RECIPE_STATES
function toggleStatus(dailyPlan) {
    if (!dailyPlan) {
        dailyPlan = {};
    }
    dailyPlan.statusIndex = (dailyPlan.statusIndex + 1) % RECIPE_STATES.length;
    if (dailyPlan.statusIndex === NO_RECIPE) {
        dailyPlan.imageVisible = false;
    } else {
        dailyPlan.imageVisible = true;
    }
}

//save a planning and redirect to recipe+list views
function savePlan(interval, dailyPlans, RecipeService, mdToast, state) {
    // console.log('savePlanning');
    for (var i = 0; i < dailyPlans.length; i++) {
        if (dailyPlans[i] && dailyPlans[i].statusIndex === NO_RECIPE) { //empty day
            deleteRecipe(RecipeService, dailyPlans, i, dailyPlans[i].dateJson.year, dailyPlans[i].dateJson.month, dailyPlans[i].dateJson.day, dailyPlans[i].recipe.url, dailyPlans[i].recipe.title, mdToast);
        }
    }
    showToastSimple(mdToast, 'Plan salvat');
    state.go('top.plan.detail', {
        start_year: interval.startDate.year(),
        start_month: interval.startDate.month() + 1,
        start_day: interval.startDate.date(),
        end_year: interval.endDate.year(),
        end_month: interval.endDate.month() + 1,
        end_day: interval.endDate.date()
    });
}

//RecipeService = factory for recipe on single day
//recipes = state parameter passed to modal
angular.module('planning').controller('GeneratePlanController', ['$scope', '$rootScope', '$mdToast', '$state', 'RandomRecipe', 'Recipe', 'Authentication',
    function($scope, $rootScope, $mdToast, $state, RandomRecipe, Recipe, Authentication) {
        // console.log('GeneratePlanController');

        $scope.dailyPlans = [];
        $scope.globalPlan = {};

        $scope.RandomRecipeService = RandomRecipe;
        $scope.RecipeService = Recipe;

        $scope.generatePlan = generatePlan;
        $scope.regeneratePlan = regeneratePlan;
        $scope.savePlan = savePlan;
        $scope.getDistanceLabel = getDistanceLabel;
        $scope.toggleStatus = toggleStatus;

        $scope.mdToast = $mdToast;
        $scope.state = $state;

        $scope.RECIPE_STATES = RECIPE_STATES;
        $scope.OK_RECIPE = OK_RECIPE;
        $scope.NO_RECIPE = NO_RECIPE;
        $scope.ANOTHER_RECIPE = ANOTHER_RECIPE;

        $scope.generateMessage = 'Generează planul';

        //default interval for plan
        $scope.date = {
            startDate: moment(),
            endDate: moment().add(6, 'days')
        };

        $scope.getNumber = function(num) {
            return new Array(num);
        };

        moment.locale('ro');
        $scope.opts = CALENDAR_OPTIONS;

        //Watch for date changes
        $rootScope.$on('interval.change', function(event, interval){
            console.log('rootscope.on', event, interval);
            $scope.date = interval;
        });
        // $scope.$watch('date', function(newDate) {
        //     console.log('New date set: ', newDate);
        //     // generatePlan($scope.date, $scope.globalPlan, $scope.dailyPlans, $scope.RandomRecipeService);
        // }, false);

    }
]);
