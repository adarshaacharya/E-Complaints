const express = require('express')
const _ = require('lodash')
const mongoose = require('mongoose')

const router = express.Router();

const { Complaint } = require('../models/complaint')

// view feedback from  home page
router.get('/feedback/view', async (req, res) => {
    try {
        const complaint = await Complaint.find()

        res.render('feedback/view.ejs', {
            complaint : complaint
        })
    }   catch(err) {
        console.log(err)
    }
})

// View feedback by user
router.post('/feedback/view', async(req, res) => {
    try {
        const complaint = await Complaint.findById(req.body.complaintId)
        res.render('feedback/view.ejs', {
            complaint : complaint
        });
    }   catch(err) {
        res.render('feedback/view.ejs', {
            errors : err.messsage
        })
    }
})

// Send feedback to complaints by officer
router.post('/feedback/add', async(req, res) => {
    try {
        console.log(req.body)
        // const newComplaint = {
        //     description : req.body.description
        // }

        // await Complaint.updateOne(
        //     {_id : req.body.complaintId},
        //     { $set : { feedback : newComplaint }, status : 'done'}
        // )

        // res.send('Feedback succesully send')
    }   catch(err) {
       res.send(err)
    }
})




module.exports = router