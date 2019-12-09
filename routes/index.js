const express = require('express')
const router = express.Router();

const { Complaint } = require('../models/complaint')

router.get('/', (req, res) => {
    try {
        const complaint = Complaint.find()
        res.render('index.ejs', {
            complaint : complaint
        })
    }   catch(err) {
        console.log(err)
    }
})




module.exports = router