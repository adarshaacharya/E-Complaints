const express = require('express')
const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')
const ComplaintController = require('../controllers/ComplaintController')

// Add new complaint by users
router.post('/complaints/add', checkNotAuthenticated, ComplaintController.addComplaint);

// view complaints from admin dashboard
router.get('/admin/complaints', checkAuthenticated, ComplaintController.adminComplaints)

// forward complaints by admin
router.post('/admin/complaints/forward', checkAuthenticated, ComplaintController.forwardComplaints)

module.exports = router