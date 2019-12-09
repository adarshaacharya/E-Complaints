// check if user is logged in if they want to access the route

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
  
    // if not authenticated
    req.flash("error_msg", "You're not authorized to view this resource");
    res.redirect("/users/login");
  }
  
  

  // ensure no user logged in if they want to access the route
  function checkNotAuthenticated(req, res, next) {
   // if authenticated
    if (req.isAuthenticated()) {
      return res.redirect("/admin/dashboard");
    }
    // if not authenticated just res that call
    next();
  }
  
  
  module.exports = {
    checkAuthenticated : checkAuthenticated,
    checkNotAuthenticated : checkNotAuthenticated
  }
   