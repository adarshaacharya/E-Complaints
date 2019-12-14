const express = require("express");

const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

router.get("/dashboard", checkAuthenticated, (req, res) => {
  try {
    if(req.user.role === 'admin')  return res.redirect("admin/dashboard")
    
    if(req.user.role === 'staff') return res.redirect("officer/dashboard")
    
  } catch (err) {
    console.log(err);
  }
});



// view admin dashboard
router.get("/admin/dashboard", checkAuthenticated, (req, res) => {
  try {
    if(req.session.role === 'admin')  res.render("admin/dashboard.ejs")
    
    if(req.session.role === 'staff') res.render('officer/dashboard.ejs')
  } catch (err) {
    console.log(err);
  }
});


// logout
router.get("/admin/logout", checkAuthenticated, (req, res) => {
    req.session.destroy();
    req.logOut();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/')
});

module.exports = router;
