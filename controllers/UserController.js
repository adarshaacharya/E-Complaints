const _ = require('lodash')
const bcrypt = require('bcryptjs');
const passport = require('passport')

const {User, validateUser} = require('../models/user')

/**
 * @route GET /admin/users
 * @description Get all the users registered by admin
 * @type RequestHandler
 */
exports.displayUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.render('admin/displayusers.ejs', {
            users : users
        });
    }   catch(err) {
        console.log(err)
    }
}

/**
 * @route POST /users/register
 * @description Register new user by admin
 * @type RequestHandler
 */
exports.registerUser = async(req, res) => {
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

}

/**
 * @route DELETE /user/delete/:id
 * @description Delete user by admin
 * @type RequestHandler
 */
exports.deleteUser = async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        await req.flash('success_msg', 'User deleted succesfully')
        res.redirect('/users/display');
    }   catch(err) {
        console.log(err)
    }
}

/**
 * @route GET /users/login
 * @description GET login page for admin/staff
 * @type RequestHandler
 */
exports.loginPage = async(req, res) => {
    try {
        res.render('users/login.ejs')
    }   catch(error) {
        console.log(error)
    }
}

/**
 * @route POST /users/login
 * @description Verify login credential by user
 * @type RequestHandler
 */
exports.loginUser = async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true // show failure msg using message : error 
      })(req, res, next);
}


/**
 * @route GET /users/login
 * @description logou t user if signed in
 * @type RequestHandler
 */
exports.logOutUser = async(req, res) => {
    req.logOut()
    req.flash('success_msg', ' Successfully logged out')
    res.redirect('/users/login')
}