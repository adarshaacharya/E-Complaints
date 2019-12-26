const { Complaint } = require('../models/complaint')

exports.homePage = async(req, res) => {
    try {
        const complaint = await Complaint.find()
        res.render('index.ejs', {
            complaint : complaint
        })
    }   catch(err) {
        console.log(err)
    }
}