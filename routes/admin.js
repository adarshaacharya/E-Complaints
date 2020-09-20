const express = require('express')

const router = express.Router()
const { checkAuthenticated } = require('../middleware/auth')

const AdminController = require('../controllers/AdminController')

const { isAdmin } = require('../middleware/role')

// view admin dashboard
router.get(
  '/dashboard',
  checkAuthenticated,
  isAdmin,
  AdminController.adminDashboad
)

// register new admin / staff
router.post('/users/register', checkAuthenticated, AdminController.registerUser)

// view complaints from admin dashboard
router.get(
  '/complaints',
  checkAuthenticated,
  isAdmin,
  AdminController.adminComplaints
)

// forward complaints by admin
router.post(
  '/complaints/forward',
  checkAuthenticated,
  AdminController.forwardComplaints
)

// show all users in admin panel
router.get(
  '/users/display',
  checkAuthenticated,
  isAdmin,
  AdminController.displayUsers
)

// delete admin /officer
router.post('/users/delete/:id', checkAuthenticated, AdminController.deleteUser)

module.exports = router
