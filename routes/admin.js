const express = require("express");

const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

const AdminController = require('../controllers/AdminController');


router.get("/dashboard", checkAuthenticated, AdminController.dashboard);


// view admin dashboard
router.get("/admin/dashboard", checkAuthenticated, AdminController.adminDashboad);


// logout
router.get("/admin/logout", checkAuthenticated, AdminController.adminLogOut);

module.exports = router;
