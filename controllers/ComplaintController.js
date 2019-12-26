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



