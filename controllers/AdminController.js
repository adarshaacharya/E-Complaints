const express = require("express");

const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

/**
 * @route GET /dashboard
 * @description Separate the user and admin dashboard according to role on session
 * @type RequestHandler
 */

exports.dashboard = async (req, res) => {
    try {
        if(req.user.role === 'admin')  return res.redirect("admin/dashboard");
        
        if(req.user.role === 'staff') return res.redirect("officer/dashboard");
        
      } catch (err) {
        console.log(err);
      } 
}


/**
 * @route GET /admin/dashboard
 * @description GET admin dashboard
 * @type RequestHandler
 */
exports.adminDashboad = async( req, res) => {
    try {
        if(req.session.role === 'admin')  res.render("admin/dashboard.ejs")
        
        if(req.session.role === 'staff') res.render('officer/dashboard.ejs')
      } catch (err) {
        console.log(err);
      }
}



/**
 * @route GET /admin/logout
 * @description Logout from admin dashboard
 * @type RequestHandler
 */
exports.adminLogOut = async(req, res) => {
    req.session.destroy();
    req.logOut();
    req.flash('success_msg', 'Successfully logged out');
    res.redirect('/')
}