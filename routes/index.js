const express = require('express')
const router = express.Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../middleware/auth')

const { Complaint } = require('../models/complaint')


router.get('/', checkNotAuthenticated, async(req, res) => {
    try {
        const complaint = await Complaint.find()
        res.render('index.ejs', {
            complaint : complaint
        })
    }   catch(err) {
        console.log(err)
    }
})




module.exports = router