const express = require('express')
const _ = require('lodash')


const { Complaint , validateComplaint} = require('../models/complaint')
const {User} =  require('../models/user')

/**
 * @route POST /complaints/add
 * @description add complaint by user
 * @type RequestHandler
 */
exports.addComplaint = async (req, res) => {
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
}

/**
 * @route GET /admin/complaints
 * @description get complaints from admin dashboard
 * @type RequestHandler
 */
exports.adminComplaints = async(req, res) => {
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
}


/**
 * @route POST /admin/complaints/forward
 * @description forward complaints by admin to staff
 * @type RequestHandler
 */
exports.forwardComplaints = async(req, res) => {
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
}


