const express = require('express')
const _ = require('lodash')

const router = express.Router();

const { Complaint , validateComplaint} = require('../models/complaint')
const {User} =  require('../models/user')
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



// view complaints from admin dashboard
router.get('/admin/complaints', checkAuthenticated, async(req, res) => {
    if(req.session.role === 'staff') res.render('officer/dashboard.ejs')
    try {
        const complaints = await Complaint.find();
        const users = await User.find()
        res.render('admin/complaints.ejs', {
            complaints : complaints,
            users : users
        })
    }   catch{
        console.log(err)
    }
})


// forward complaints by admin
router.post('/admin/complaints/forward', checkAuthenticated, async(req, res) => {
    try {
        const staffId = req.body.staffId
        const complaintId = req.body.complaintId

        await Complaint.updateOne(
           {_id: complaintId}, 
           {  $set :  { forwardTo : staffId } }
        );

       res.redirect('/admin/complaints')
    }   catch(err){
        console.log(err)
    }
})




module.exports = router