'use strict';

var getDateFromString = function(year, month, day) {
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};


// dd/MM/yyyy => Date
var getDateFromStringFull = function(dateString) {
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


var recipeImagesPath = '/assets/recipes/';
var filenameSeparator = '_';
var width = 250;
var height = 300;

function getImagefile(type, filename, width, height, ext) {
    return recipeImagesPath + filename + filenameSeparator + width + filenameSeparator + height + (type ? (filenameSeparator + type) : '') + '.' + ext;
}

function createPictureKey(elem) {
    //if a local image exists, then process it
    if (elem.image) {
        var spl = elem.image.split('.');
        var ext = _.last(spl); //extension
        var filename = _.initial(spl);
        elem.picture = {
            sm: getImagefile('sm', filename, width, height, ext),
            md: getImagefile('md', filename, width, height, ext),
            lg: getImagefile('lg', filename, width, height, ext),
            gt_lg: getImagefile('gt_lg', filename, width, height, ext),
            def: getImagefile(null, filename, width, height, ext)
        };
        elem.imageDefault = elem.picture.def;
    }
    //else just return remote image 
    else {
        elem.imageDefault = elem.origin.image;
    }
}

module.exports = {
    getDateFromString: getDateFromString,
    getDateFromStringFull: getDateFromStringFull,
    dateToJson: dateToJson,
    createPictureKey: createPictureKey
};
