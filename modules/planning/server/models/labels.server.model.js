'use strict';

var path = require('path'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    mongoose = require('mongoose'),
    Recipes = mongoose.model('Recipes');


var get = function(username, callback) { //based on year/month/day
    Recipes.aggregate({
            $unwind: '$labels'
        }, {
            $group: {
                '_id': '$labels',
                total: {
                    $sum: 1
                }
            }
        },
        function(err, data) {
            if (err) callback(err, null);
            else callback(null, data);
        });

};

module.exports = get;
