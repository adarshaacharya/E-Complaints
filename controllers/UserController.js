const passport = require('passport')

/**
 * @route GET /users/login
 * @description GET login page for admin/staff
 * @type RequestHandler
 */
exports.loginPage = async (req, res) => {
  try {
    res.render('users/login.ejs')
  } catch (error) {
    console.log(error)
  }
}

/**
 * @route POST /users/login
 * @description Verify login credential by user
 * @type RequestHandler
 */
exports.loginUser = async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/filterDashboard',
    failureRedirect: '/users/login',
    failureFlash: true // show failure msg using message : error
  })(req, res, next)
}

/**
 * @route GET /users/login
 * @description logou t user if signed in
 * @type RequestHandler
 */
exports.logOutUser = async (req, res) => {
  req.logOut()
  req.flash('success_msg', ' Successfully logged out')
  res.redirect('/users/login')
}
