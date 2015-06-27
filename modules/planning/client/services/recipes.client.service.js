'use strict';

var millisecondsInDay = 86400000;
var path = '/';
var daysPerWeek = 7; //days
var weekDays = {
    long: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
    short: ['Du', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa']
};
var weekDistanceLabels = {
    '-1': 'ieri',
    '0': 'azi',
    '1': 'mâine'
};

Date.prototype.toJson = function() {
    return {
        year: this.getFullYear(),
        month: this.getMonth() + 1,
        day: this.getDate()
    };
};

var setDayDistanceLabel = function(distance, callback) {
    if (!!weekDistanceLabels[distance]) {
        // label = weekDistanceLabels[distance];
        // relativeToToday = false;
        callback(weekDistanceLabels[distance], false);
    } else {
        // label = ((distance > 0) ? 'peste' : 'acum');
        // relativeToToday = true;
        callback(((distance > 0) ? 'peste' : 'acum'), true);
    }
};

var getWeekDay = function(index, style) {
    if (style === 'l')
        return weekDays.long[index];
    else if (style === 's')
        return weekDays.short[index];
};

var getRecipeUrl = function(recipe_title) {
    if (!!recipe_title)
        return encodeURI(recipe_title.replace(/ /g, '_'));
    else return '';
};

var fillCustomAttributesPlan = function(dailyPlans, today) {
    _.each(dailyPlans, function(dailyPlan) {
        dailyPlan.date = new Date(dailyPlan.date);
        dailyPlan.dayDistance = Math.round((dailyPlan.date - today) / millisecondsInDay);
        dailyPlan.dayLabel = getWeekDay(dailyPlan.date.getDay(), 's');
        dailyPlan.dateJson = dailyPlan.date.toJson();
        setDayDistanceLabel(dailyPlan.dayDistance, function(label, relativeToToday) {
            dailyPlan.dayDistanceLabel = label;
            dailyPlan.dayDistanceRelativeToToday = relativeToToday;
        });

        var ingredients = _.union(_.flatten(_.pluck(dailyPlan.recipe.ingredients, 'list')));
        dailyPlan.recipe.ingredientNumber = _.union(_.pluck(ingredients, 'name')).length;

        dailyPlan.recipe.url = getRecipeUrl(dailyPlan.recipe.title);
        // dailyPlan.recipe.image = dailyPlan.recipe.image ? (recipeImagesPath + dailyPlan.recipe.image) : dailyPlan.recipe.origin.image; //my photo has priority
    });
    return dailyPlans;
};

var mixinRecipes = function(data) {
    var today = new Date().setHours(0, 0, 0, 0);
    fillCustomAttributesPlan(data, today);
    return data;
};


// Recipes service used for communicating with the users REST endpoint
angular.module('planning').factory('Recipes', ['$resource',
    function($resource) {
        return $resource('api/recipes/:start_year/:start_month/:start_day/:end_year/:end_month/:end_day', {}, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, header) {
                    // console.log('in list factory', data, header)
                    data = JSON.parse(data);
                    return mixinRecipes(data);
                }
            }
        });
    }
]);
