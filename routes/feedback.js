const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const router = express.Router();

const { Complaint } = require('../models/complaint')


// Add new feedback from user
router.post('/feedback/add', async(req, res) => {
    try {
       
        const newComplaint = {
            description : req.body.description
        }

        await Complaint.updateOne(
            {_id : req.body.complaintId},
            { $set : { feedback : newComplaint }}
        )

        res.send('Fedback succesully send')

    }   catch(err) {
        console.log(err)
    }
})






module.exports = router