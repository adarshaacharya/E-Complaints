const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const router = express.Router();

const { Complaint } = require('../models/complaint')


// Send feedback to complaints by officer
router.post('/feedback/add', async(req, res) => {
    try {
        const newComplaint = {
            description : req.body.description
        }

        await Complaint.updateOne(
            {_id : req.body.complaintId},
            { $set : { feedback : newComplaint }, status : 'done'}
        )

        res.send('Feedback succesully send')
    }   catch(err) {
       res.send(err)
    }
})


// View feedback by user
router.post('/feedback/view', async(req, res) => {
    try {
        const complaint = await Complaint.findById(req.body.complaintId)

        if(complaint.status === 'pending') {
            return res.json('Error : Your Complaint Has Not Yet Been Answered Please Wait a Bit And Try Again Later')
        }

        res.send(complaint.feedback)
    }   catch(err) {
        res.send(error)
    }
})


module.exports = router