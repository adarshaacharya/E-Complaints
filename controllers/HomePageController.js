const { Complaint } = require('../models/complaint')

exports.homePage = async (req, res) => {
  try {
    const complaint = await Complaint.find()
    res.render('index.ejs', {
      complaint
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route GET /dashboard
 * @description Separate the user and admin dashboard according to role on session
 * @type RequestHandler
 */
exports.filterDashboard = async (req, res) => {
  try {
    if (req.user.role === 'admin') return res.redirect('admin/dashboard')

    if (req.user.role === 'staff') return res.redirect('staff/dashboard')
  } catch (err) {
    console.log(err)
  }
}
