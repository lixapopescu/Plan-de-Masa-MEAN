'use strict';

var getDateFromString = function(year, month, day) {
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};


// dd/MM/yyyy => Date
var getDateFromStringFull = function(dateString){
    var s = dateString.split('/');
    return getDateFromString(s[2], s[1], s[0]);
};

var dateToJson = function(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    };
};

module.exports = {
	getDateFromString: getDateFromString,
	getDateFromStringFull: getDateFromStringFull,
	dateToJson: dateToJson
};