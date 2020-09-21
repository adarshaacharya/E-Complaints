const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

// Load User model
const { User } = require('../models/user')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    // Match user
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false, { message: 'That email is not registered' })
    }

    try {
      // Match password
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        return done(null, user)
      }
      return done(null, false, { message: 'Password is incorrect' })
    } catch (err) {
      return done(null, false, { error: err })
    }
  }

  // using email as email in above function
  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = initialize
