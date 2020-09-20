// check if user is logged in if they want to access the route

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      req.session.role = 'admin'
    }

    if (req.user.role === 'staff') {
      req.session.role = 'staff'
    }
    return next()
  }

  // if not authenticated
  req.flash('error_msg', "You're not authorized to view this resource")
  res.redirect('/users/login')
}

// ensure no user logged in if they want to access the route
function checkNotAuthenticated(req, res, next) {
  // if authenticated
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      req.session.role = 'admin'
      return res.redirect('/admin/dashboard')
    }

    if (req.user.role === 'staff') {
      req.session.role = 'staff'
      return res.redirect('/staff/dashboard')
    }
  }
  // if not authenticated just res that call
  next()
}

// k ho yo feri export ?  yo duita function lai export gareko

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
}
