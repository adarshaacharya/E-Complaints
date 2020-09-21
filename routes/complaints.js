const express = require('express')

const router = express.Router()
const { checkNotAuthenticated } = require('../middleware/auth')
const ComplaintController = require('../controllers/ComplaintController')

// Add new complaint by users
router.post(
  '/complaints/add',
  checkNotAuthenticated,
  ComplaintController.addComplaint
)

module.exports = router
