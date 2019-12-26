const _ = require('lodash')
const { checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth");
const {Complaint} = require('../models/complaint')

/**
 * @route GET /officer/dashboard
 * @description View Staff Dashboard
 * @type RequestHandler
 */
exports.staffDashboard = async (req, res) => {
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
}


/**
 * @route GET /officer/complaints
 * @description View Complaints from Staff Page
 * @type RequestHandler
 */
exports.viewComplaints = async (req, res) => {
    if (req.session.role === "admin") return   res.render('officer/dashboard.ejs');
    try {
      const complaints = await Complaint.find({ forwardTo : req.user._id})
  
      if (req.session.role === "staff") {
        return res.render("officer/complaints.ejs", {
          staff : req.user,
          complaints : complaints
        });
      }
  
    } catch(err) {
      console.log(err)
    }
}

/**
 * @route POST /complaints/feedback
 * @description Post feedback to complaints by Staff
 * @type RequestHandler
 */
exports.complaintFeedback = async(req, res) => {
    try {
        await Complaint.updateOne(
          {_id : req.body.complaintId},
          {$set : { feedback : req.body.feedback, status : 'done' }}
        );
  
        await req.flash("success_msg", "Complaint replied successfully");
        res.redirect('/officer/dashboard')
    } catch(err) {
      console.log(err)
    }
}

/**
 * @route GET /staff/logout
 * @description LogOut from staff page
 * @type RequestHandler
 */
exports.staffLogOut = async(req, res) => {
    req.session.destroy();
    req.logOut();
    req.flash("success_msg", "Successfully logged out");
    res.redirect("/");
}