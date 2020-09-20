const { Complaint } = require('../models/complaint')

// if user tries to visit admin route from staff session then load staff home page
const isAdmin = async (req, res, next) => {
  if (req.session.role === 'staff') {
    const complaints = await Complaint.find({ forwardTo: req.user._id })
    return res.render('staff/dashboard.ejs', {
      staff: req.user,
      complaints
    })
  }
  next()
}

// if user tries to visit staff route from admin session then load admin home page
const isStaff = async (req, res, next) => {
  if (req.session.role === 'admin') {
    return res.render('admin/dashboard.ejs', { admin: req.user })
  }
  next()
}

module.exports = {
  isAdmin,
  isStaff
}
