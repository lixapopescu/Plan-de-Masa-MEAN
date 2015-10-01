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
  notes: [String],//comments regarding the current date (eg: )
  recipe: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    fromRequest: {
      year: Number,
      month: Number,
      day: Number,
      index: Number,
    filters: [String]
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
}, {
  safe: {j: 1} //Write concern: journal enabled
});

PlanningSchema.pre('save', function (next) {
  Utils.createPictureKey(this);
  next();
});


mongoose.model('Planning', PlanningSchema);
