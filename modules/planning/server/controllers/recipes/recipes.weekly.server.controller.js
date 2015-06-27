'use strict';

var defaultUsername = 'website';

/**
 * Module dependencies.
 */
var //_ = require('lodash'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    mongoose = require('mongoose'),
    Utils = require(path.resolve('./modules/core/server/model/utils')),
    Planning = mongoose.model('Planning');


exports.find = function(req, res) {
    var username = req.user ? req.user.username : defaultUsername;
    console.log('recipes.weekly.server.controller ', username);
    var planning = Planning.find({
            date: {
                $gte: Utils.getDateFromString(req.params.start_year, req.params.start_month, req.params.start_day),
                $lte: Utils.getDateFromString(req.params.end_year, req.params.end_month, req.params.end_day)
            },
            username: username
        },
        function(err, data) {
            if (!err) {
                res.json(data);
            } else {
                res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });

            }
        });
};

/**
 * Signup
 */
// exports.signup = function(req, res) {
//  // For security measurement we remove the roles from the req.body object
//  delete req.body.roles;

//  // Init Variables
//  var user = new User(req.body);
//  var message = null;

//  // Add missing user fields
//  user.provider = 'local';
//  user.displayName = user.firstName + ' ' + user.lastName;

//  // Then save the user 
//  user.save(function(err) {
//      if (err) {
//          return res.status(400).send({
//              message: errorHandler.getErrorMessage(err)
//          });
//      } else {
//          // Remove sensitive data before login
//          user.password = undefined;
//          user.salt = undefined;

//          req.login(user, function(err) {
//              if (err) {
//                  res.status(400).send(err);
//              } else {
//                  res.json(user);
//              }
//          });
//      }
//  });
// };

/**
 * Signin after passport authentication
 */
// exports.signin = function(req, res, next) {
//  passport.authenticate('local', function(err, user, info) {
//      if (err || !user) {
//          res.status(400).send(info);
//      } else {
//          // Remove sensitive data before login
//          user.password = undefined;
//          user.salt = undefined;

//          req.login(user, function(err) {
//              if (err) {
//                  res.status(400).send(err);
//              } else {
//                  res.json(user);
//              }
//          });
//      }
//  })(req, res, next);
// };
