const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy(function(username, password, done) {
    let query = {
      username: username
    };
    User.findOne(query, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {
          message: 'No user found'
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Wrong password'
        });
      } else {
        return done(null, user);
      }
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}