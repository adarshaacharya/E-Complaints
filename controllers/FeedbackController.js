const { Complaint } = require('../models/complaint')

/**
 * @route GET /feedback/view
 * @description View Feedback Checking Page
 * @type RequestHandler
 */
exports.viewFeedbackPage = async (req, res) => {
  try {
    const complaint = await Complaint.find()

    res.render('feedback/view.ejs', {
      complaint
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * @route POST /feedback/view
 * @description POST req to ceheck feedback by user
 * @type RequestHandler
 */
exports.checkFeedback = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.body.complaintId)
    res.render('feedback/view.ejs', {
      complaint
    })
  } catch (err) {
    res.render('feedback/view.ejs', {
      errors: err.messsage
    })
  }
}
