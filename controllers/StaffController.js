const { Complaint } = require('../models/complaint')

/**
 * @route GET /staff/dashboard
 * @description View Staff Dashboard
 * @type RequestHandler
 */
exports.staffDashboard = async (req, res) => {
  try {
    const complaints = await Complaint.find({ forwardTo: req.user._id })
    res.render('staff/dashboard.ejs', {
      staff: req.user,
      complaints
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route GET /staff/complaints
 * @description View Complaints from Staff Page
 * @type RequestHandler
 */
exports.viewComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ forwardTo: req.user._id })

    if (req.session.role === 'staff') {
      return res.render('staff/complaints.ejs', {
        staff: req.user,
        complaints
      })
    }
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route POST /complaints/feedback
 * @description Post feedback to complaints by Staff
 * @type RequestHandler
 */
exports.complaintFeedback = async (req, res) => {
  try {
    await Complaint.updateOne(
      { _id: req.body.complaintId },
      { $set: { feedback: req.body.feedback, status: 'done' } }
    )

    await req.flash('success_msg', 'Complaint replied successfully')
    res.redirect('/staff/dashboard')
  } catch (err) {
    console.log(err)
  }
}
