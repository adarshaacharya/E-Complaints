const express = require("express");

const router = express.Router();

router.get("/officer/dashboard", (req, res) => {
  try {
    res.render("officer/dashboard.ejs");
  } catch (err) {
    console.log(err);
  }
});

// logout
router.get("/officer/logout", (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/')
});

module.exports = router;
