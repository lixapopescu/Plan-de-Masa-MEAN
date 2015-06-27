'use strict';

var path = require('path'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    mongoose = require('mongoose'),
    Planning = mongoose.model('Planning');


var get = function(start_year, start_month, start_day, end_year, end_month, end_day, username, callback) { //based on year/month/day
    Planning.aggregate({
            $match: {
                date: {
                    $gte: Utils.getDateFromString(start_year, start_month, start_day),
                    $lte: Utils.getDateFromString(end_year, end_month, end_day)
                },
                username: username
            }
        }, {
            $unwind: '$recipe.ingredients'
        }, {
            $unwind: '$recipe.ingredients.list'
        },
        //unfold with no children
        {
            $project: {
                name: '$recipe.ingredients.list.name',
                quant: '$recipe.ingredients.list.quantity',
                um: '$recipe.ingredients.list.um',
                comment: '$recipe.ingredients.list.comment',
                category: '$recipe.ingredients.list.category',
                recipe_id: '$recipe._id'
            }
        },
        //group by categorie, nume, um
        {
            $group: {
                '_id': {
                    cat: '$category',
                    ing: '$name',
                    um: '$um'
                },
                details: {
                    $push: {
                        recipe_id: '$recipe_id',
                        comment: '$comment',
                        quantity: '$quant',
                        um: '$um'
                    }
                },
                tot: {
                    $sum: '$quant'
                }
            }
        },
        //replace '_id' with it's children
        {
            $project: {
                '_id': false,
                category: '$_id.cat',
                ingredient: '$_id.ing',
                total: '$tot',
                um: '$_id.um',
                details: '$details'
            }
        },
        //finally, group by main criteria, '$categorie'
        //and make custom element
        {
            $group: {
                '_id': '$category',
                ingredients: {
                    $push: {
                        'name': '$ingredient',
                        'total': '$total',
                        'um': '$um',
                        'details': '$details'
                    }
                }
            }
        },
        function(err, data) {
            // console.log('lista query', data);
            if (err) callback(err, null);
            else callback(null, data);
        });

};

module.exports = get;
