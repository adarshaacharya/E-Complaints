const express= require('express')
const router = express.Router()
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')
const UserController = require('../controllers/UserController')

// show all users in admin panel
router.get('/users/display', checkAuthenticated, UserController.displayUsers)

// register new admin / staff
router.post('/users/register', checkAuthenticated, UserController.registerUser)

// delete admin /officer
router.post('/users/delete/:id', checkAuthenticated, UserController.deleteUser)

// login form
router.get('/users/login', checkNotAuthenticated, UserController.loginPage)


// Login submit
router.post('/users/login', checkNotAuthenticated, UserController.loginUser);
  
 //  logout User
router.get('/users/logout', checkAuthenticated, UserController.logOutUser)

module.exports = router