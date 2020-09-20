const express = require('express')

const router = express.Router()
const { checkNotAuthenticated } = require('../middleware/auth')
const FeedbackController = require('../controllers/FeedbackController')

// view feedback Page
router.get('/view', checkNotAuthenticated, FeedbackController.viewFeedbackPage)

// Check feedback from user Id
router.post('/view', checkNotAuthenticated, FeedbackController.checkFeedback)

module.exports = router
