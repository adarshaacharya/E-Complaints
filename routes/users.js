const express = require('express')

const router = express.Router()
const {
  checkAuthenticated,
  checkNotAuthenticated
} = require('../middleware/auth')
const UserController = require('../controllers/UserController')

// login form
router.get('/login', checkNotAuthenticated, UserController.loginPage)

// Login submit
router.post('/login', checkNotAuthenticated, UserController.loginUser)

//  logout User
router.get('/logout', checkAuthenticated, UserController.logOutUser)

module.exports = router
