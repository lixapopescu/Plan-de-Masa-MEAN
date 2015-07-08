'use strict';

var space = ' ';
var daysString = 'zile';
var toastDelay = 6000; //ms
var toastPosition = 'bottom left';
var toastUndoMessage = 'M-am răzgândit';

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
