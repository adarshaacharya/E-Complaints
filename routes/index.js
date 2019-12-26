const express = require('express')
const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

const HomePageController = require('../controllers/HomePageController');

// get index page 
router.get('/', checkNotAuthenticated, HomePageController.homePage)

module.exports = router