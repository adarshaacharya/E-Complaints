const express = require("express");
const router = express.Router();
const { checkAuthenticated, checkNotAuthenticated} = require("../middleware/auth");
const StaffController = require('../controllers/StaffController')

// view main officer dashboard
router.get("/officer/dashboard", checkAuthenticated, StaffController.staffDashboard);

// view officer complaints
router.get('/officer/complaints', checkAuthenticated, StaffController.viewComplaints)

// reply to complaint by officer
router.post('/complaints/feedback', checkAuthenticated, StaffController.complaintFeedback)

// logout
router.get("/officer/logout", checkAuthenticated, StaffController.staffLogOut);


module.exports = router;
