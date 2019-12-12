const express = require("express");

const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

router.get("/admin/dashboard", checkAuthenticated, (req, res) => {
  try {
    // if (req.session.role == 'admin') {
    //   res.render("admin/dashboard.ejs");
    // } else {
    //   res.render("officer/dashboard.ejs");
    // }

    
    res.render("admin/dashboard.ejs");

  } catch (err) {
    console.log(err);
  }
});


// logout
router.get("/admin/logout", checkAuthenticated, (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/')
});

module.exports = router;
