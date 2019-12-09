// Feedback is given by Particular department Minister
const mongoose = require("mongoose");
const moment = require('moment')

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 10,
    maxlength: 5000
  },
  date : {
    type : String,
    default : moment().format('MMMM Do YYYY, h:mm:ss a')
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);


// exporting Schema
module.exports.feedbackSchema = feedbackSchema 

module.exports.Feedback = Feedback;
