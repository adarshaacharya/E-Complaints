const express = require("express");

const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

router.get("/officer/dashboard", checkAuthenticated, (req, res) => {


  try {

    if(req.session.role === 'admin')  return res.render("admin/dashboard.ejs")
    
    if(req.session.role === 'staff')return  res.render('officer/dashboard.ejs')
  else{
    console.log(req.session)
    return res.send("NOT OK")
  }
  } catch (err) {
    console.log(err);
  }
});

// logout
router.get("/officer/logout", checkAuthenticated,(req, res) => {
  req.session.destroy()
    req.logOut();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/')
});

module.exports = router;
