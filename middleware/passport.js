const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load User model
const { User } = require("../models/user");

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // Match user
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "That email is not registered" });
    }

    try {
      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password is incorrect" });
      }
    } catch (err) {
        return done(null, false, {error : err})
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}






module.exports = initialize;