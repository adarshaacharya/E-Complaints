const express = require('express')
const _ = require('lodash')

const router = express.Router();

const { Complaint , validateComplaint} = require('../models/complaint')
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

// Add new complaint by users
router.post('/complaints/add', async(req, res) => {
    const {citizenship, description} = req.body; 
    const {error} = validateComplaint(req.body)
    if(error) {
        res.render('index.ejs', {
            errors : error.details[0].message,
            citizenship,
            description
        });
    }

    try {
        const complaint = new Complaint(_.pick(req.body, ['citizenship', 'category', 'description']))
        const newComplaint =  await complaint.save();
        await req.flash('success_msg', `Complaint registered succesfully. Reference ID : ${newComplaint._id}`);

        res.redirect('/');
    }   catch(err) {
        console.log(err)
    }
})



// view complaints frm admin dashboard
router.get('/admin/complaints', checkAuthenticated, (req, res) => {
    try {
        res.render('admin/complaints.ejs')
    }   catch{
        console.log(err)
    }
})




module.exports = router