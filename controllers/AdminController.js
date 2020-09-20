const _ = require('lodash')
const bcrypt = require('bcryptjs')

const { User, validateUser } = require('../models/user')
const { Complaint } = require('../models/complaint')

/**
 * @route GET /admin/dashboard
 * @description GET admin dashboard
 * @type RequestHandler
 */
exports.adminDashboad = async (req, res) => {
  try {
    if (req.session.role === 'admin') {
      return res.render('admin/dashboard.ejs', {
        admin: req.user
      })
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route POST /users/register
 * @description Register new user by admin
 * @type RequestHandler
 */
exports.registerUser = async (req, res) => {
  const { error } = validateUser(req.body)
  if (error) {
    return res.render('admin/dashboard.ejs', {
      errors: error.details[0].message,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      admin: req.user
    })
  }

  try {
    const user = new User(
      _.pick(req.body, ['name', 'email', 'password', 'department', 'role'])
    )
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    await user.save()

    await req.flash(
      'success_msg',
      `${req.body.name} : ${req.body.email} successfully registered as ${req.body.role} and can login.`
    )
    res.redirect('/admin/dashboard')
  } catch (error) {
    return res.render('admin/dashboard.ejs', {
      errors: error,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      admin: req.user
    })
  }
}

/**
 * @route GET /admin/complaints
 * @description get complaints from admin dashboard
 * @type RequestHandler
 */
exports.adminComplaints = async (req, res) => {
  if (req.session.role === 'staff') {
    return res.render('staff/dashboard.ejs', { staff: req.user })
  }
  try {
    const complaints = await Complaint.find()
    const users = await User.find()
    res.render('admin/complaints.ejs', {
      complaints,
      users,
      admin: req.user
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route POST /admin/complaints/forward
 * @description forward complaints by admin to staff
 * @type RequestHandler
 */
exports.forwardComplaints = async (req, res) => {
  try {
    const { staffId } = req.body
    const { complaintId } = req.body

    await Complaint.updateOne(
      { _id: complaintId },
      { $set: { forwardTo: staffId } }
    )
    await req.flash('success_msg', 'Complaint forwarded successfully')
    res.redirect('/admin/complaints')
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route GET /admin/users
 * @description Get all the users registered by admin
 * @type RequestHandler
 */
exports.displayUsers = async (req, res) => {
  if (req.session.role === 'staff') {
    return res.render('staff/dashboard.ejs', { staff: req.user })
  }
  try {
    const users = await User.find()
    res.render('admin/displayusers.ejs', {
      users,
      admin: req.user
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route DELETE /user/delete/:id
 * @description Delete user by admin
 * @type RequestHandler
 */
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    await req.flash('success_msg', 'User deleted succesfully')
    res.redirect('/admin/users/display')
  } catch (err) {
    console.log(err)
  }
}
