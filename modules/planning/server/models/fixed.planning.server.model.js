'use strict';

var path = require('path'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FixedPlanningSchema = new Schema({
    interval: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    days: [{planningId: Number}],
    username: String
}, {
    collection: 'fixedplanning'
}, {
  safe: {j: 1}
});

mongoose.model('FixedPlanning', FixedPlanningSchema);
