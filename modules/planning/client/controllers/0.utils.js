'use strict';

var space = ' ';
var daysString = 'zile';
var toastDelay = 6000; //ms
var toastPosition = 'bottom left';
var toastUndoMessage = 'M-am răzgândit';
var DATE_FORMAT = 'dd DD MMMM';

var CALENDAR_OPTIONS = {
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
    format: DATE_FORMAT,
    ranges: {
        'De azi': [moment(), moment().add(6, 'days')],
        'De mâine': [moment().add(1, 'days'), moment().add(7, 'days')],
        'Săptămâna viitoare': [moment().day(8), moment().day(8).add(6, 'days')]
    }
};

function getDistanceLabel(day) {
    if (day.dayDistanceRelativeToToday)
        return [day.dayDistanceLabel, Math.abs(day.dayDistance), daysString];
    else
        return [' ', day.dayDistanceLabel, ' '];
}

function showToastSimple(mdToast, message) {
    mdToast.show(
        mdToast.simple()
        .content(message)
        .position(toastPosition)
        .hideDelay(toastDelay)
    );
}

function showToastUndo(mdToast, message, callback) {
    var toast = mdToast.simple()
        .content(message)
        .action(toastUndoMessage)
        .highlightAction(false)
        .position(toastPosition);
    mdToast.show(toast).then(function() {
        callback();
    });
}

function getInterval(dailyPlans) {
    // console.log('dailyPlans', dailyPlans);
    // var plan = {};

    var firstDay =
        _.chain(dailyPlans)
        .sortBy(function(d) {
            return d.date;
        })
        .first()
        .value();
    var lastDay =
        _.chain(dailyPlans)
        .sortBy(function(d) {
            return d.date;
        })
        .last()
        .value();

    // plan.start = {
    //     dayLabel: firstDay.dayLabel,
    //     distanceLabel: getDistanceLabel(firstDay)
    // };
    // plan.last = {
    //     dayLabel: lastDay.dayLabel,
    //     distanceLabel: getDistanceLabel(lastDay)
    // };
    // console.log(firstDay, lastDay);

    var interval = {
        startDate: moment(firstDay.date),
        endDate: moment(lastDay.date)
    };
    // console.log(interval);

    return interval;
}
