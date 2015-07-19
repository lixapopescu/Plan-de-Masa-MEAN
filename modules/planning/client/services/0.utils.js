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
var weekendIndex = [0, 6];

Date.prototype.toJson = function() {
    return {
        year: this.getFullYear(),
        month: this.getMonth() + 1,
        day: this.getDate()
    };
};

function setDayDistanceLabel(distance, callback) {
    if (!!weekDistanceLabels[distance]) {
        // label = weekDistanceLabels[distance];
        // relativeToToday = false;
        callback(weekDistanceLabels[distance], false);
    } else {
        // label = ((distance > 0) ? 'peste' : 'acum');
        // relativeToToday = true;
        callback(((distance > 0) ? 'peste' : 'acum'), true);
    }
}

function getWeekDay(index, style) {
    if (style === 'l')
        return weekDays.long[index];
    else if (style === 's')
        return weekDays.short[index];
}

function getRecipeUrl(recipe_title) {
    if (!!recipe_title)
        return encodeURI(recipe_title.replace(/ /g, '_'));
    else return '';
}

function fillCustomAttributesPlan(dailyPlan, today) {
    dailyPlan.date = new Date(dailyPlan.date);
    dailyPlan.dayDistance = Math.round((dailyPlan.date - today) / millisecondsInDay);
    dailyPlan.dayLabel = getWeekDay(dailyPlan.date.getDay(), 's');
    dailyPlan.dateJson = dailyPlan.date.toJson();
    setDayDistanceLabel(dailyPlan.dayDistance, function(label, relativeToToday) {
        dailyPlan.dayDistanceLabel = label;
        dailyPlan.dayDistanceRelativeToToday = relativeToToday;
    });
    dailyPlan.weekend = _.contains(weekendIndex, moment(dailyPlan.date).day());

    var ingredients = _.union(_.flatten(_.pluck(dailyPlan.recipe.ingredients, 'list')));
    dailyPlan.recipe.ingredientNumber = _.union(_.pluck(ingredients, 'name')).length;

    dailyPlan.recipe.url = getRecipeUrl(dailyPlan.recipe.title);
    if (!dailyPlan.recipe.imageDefault) {
        dailyPlan.recipe.imageDefault = (dailyPlan.picture) ? dailyPlan.picture.def : dailyPlan.recipe.origin.image;
    }

    dailyPlan.imageVisible = true;
    // dailyPlan.recipe.image = dailyPlan.recipe.image ? (recipeImagesPath + dailyPlan.recipe.image) : dailyPlan.recipe.origin.image; //my photo has priority
    // console.log('dailyPlan after', dailyPlan);
}

function mixinRecipe(dailyPlan, today) {
    if (!today) today = new Date().setHours(0, 0, 0, 0);
    fillCustomAttributesPlan(dailyPlan, today);
    return dailyPlan;
}

function mixinRecipes(dailyPlans) {
    var today = new Date().setHours(0, 0, 0, 0);
    _.each(dailyPlans, function(dailyPlan) {
        dailyPlan = mixinRecipe(dailyPlan, today);
        // console.log(dailyPlan);
    });
    return dailyPlans;
}

function mixinFixedPlanning(fixedplan) {
    fixedplan.interval.startDate = moment(fixedplan.interval.startDate);
    fixedplan.interval.endDate = moment(fixedplan.interval.endDate);
    // fixedplan.interval.startDateJson = fixedplan.interval.startDate.toJson();
    // fixedplan.interval.endDateJson = fixedplan.interval.endDate.toJson();
}

/**
 * Post-processing for planning history after retrieving from server
 */
function mixinFixedPlanningHistory(fixedPlans) {
    // console.log('mixinFixedPlanningHistory');
    _.each(fixedPlans, function(fixedplan) {
        fixedplan = mixinFixedPlanning(fixedplan);
    });
    return fixedPlans;
}
