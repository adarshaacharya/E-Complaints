const express= require('express')
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcryptjs');
const passport = require('passport')

const {User, validateUser} = require('../models/user')
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')


// show all users
router.get('/users/display', checkAuthenticated, async(req, res) => {
    try {
        const users = await User.find()
        res.render('admin/displayusers.ejs', {
            users : users
        });
    }   catch(err) {
    console.log(err)
    }
})

// get user registration form
// router.get('/users/register', checkAuthenticated, (req, res) => {
//     try {
//         res.render('test.ejs')
//     }   catch(err) {
//         console.log(err)
//     }

// })


router.post('/users/register', checkAuthenticated, async(req, res) => {

    const { error } = validateUser(req.body)

    if(error) {
        return res.render('admin/dashboard.ejs', {
            errors : error.details[0].message,
            name : req.body.name,
            email : req.body.email,
            password  : req.body.password,
            confirmPassword : req.body.confirmPassword
        })
    } 

    try {
        const user = new User(_.pick(req.body, ['name', 'email', 'password', 'department', 'role']));


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword;
        await user.save();

        await req.flash('success_msg', `${req.body.name} successfully registered and can login.`)
        res.redirect('/admin/dashboard')
     }   catch(error) {
        return res.render('admin/dashboard.ejs', {
            errors : error,
            name : req.body.name,
            email : req.body.email,
            password  : req.body.password,
            confirmPassword  : req.body.confirmPassword
        })
    }

})


// login form
router.get('/users/login', checkNotAuthenticated, (req, res) => {
    try {
        res.render('users/login.ejs')
    }   catch(error) {
        console.log(error)
    }
})


// Login submit
router.post('/users/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true // show failure msg using message : error 
    })(req, res, next);
   console.log(req.session)
  });
 
 

   // logout
 router.get('/users/logout', (req, res) => {
    req.logOut()
    req.flash('success_msg', ' Successfully logged out')
    res.redirect('/users/login')
 })


module.exports = router