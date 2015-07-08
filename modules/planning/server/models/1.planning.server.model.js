'use strict';

var path = require('path'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlanningSchema = new Schema({
    username: {
        type: String,
        required: true,
        default: 'website'
    },
    date: {
        type: Date,
        required: true
    },
    archived: {
        type: Number,
        default: 0
    },
    recipe: {
        title: {
            type: String,
            required: true,
            trim: true
        },
        origin: {
            url: String,
            language: String,
            image: String,
            copyright: String
        },
        story: String,
        labels: [String],
        dish_labels: [String],
        short_name: String,
        image: String,
        picture: {
            sm: String,
            md: String,
            lg: String,
            gt_lg: String,
            def: String
        },
        imageDefault: String,
        persons: Number,
        original_recipes: [Object],
        time: Number,
        level: Number,
        language: String,
        ingredients: [{
            for_what: String,
            list: [{
                name: String,
                quantity: Number,
                um: String,
                category: String,
                comment: String
            }]
        }],
        instructions: [{
            order: Number,
            for_what: String,
            text: String
        }],
        comments: [{
            username: String,
            text: String,
            rating: String
        }]

    }

}, {
    collection: 'planning'
});

PlanningSchema.pre('save', function(next) {
    Utils.createPictureKey(this);
    next();
});


mongoose.model('Planning', PlanningSchema);
