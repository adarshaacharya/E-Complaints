const express = require("express");

const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth");
const {Complaint} = require('../models/complaint')

// view main officer dashboard
router.get("/officer/dashboard", checkAuthenticated, async(req, res) => {
  if (req.session.role === "admin") return res.render("officer/dashboard.ejs");

  try {
    const complaints = await Complaint.find({ forwardTo : req.user._id})

    res.render('officer/dashboard.ejs',{
      staff : req.user,
      complaints : complaints
    });
  } catch (err) {
    console.log(err);
  }
});


// view officer complaints
router.get('/officer/complaints', checkAuthenticated, (req, res) => {
  try {
    if (req.session.role === "admin") return   res.render('officer/dashboard.ejs');

    if (req.session.role === "staff") return res.render("officer/complaints.ejs");

  } catch(err) {
    console.log(err)
  }
})




// logout
router.get("/officer/logout", checkAuthenticated, (req, res) => {
  req.session.destroy();
  req.logOut();
  req.flash("success_msg", "Successfully logged out");
  res.redirect("/");
});

module.exports = router;
