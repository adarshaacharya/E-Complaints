// Feedback is given by Particular department Minister
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 10,
    maxlength: 5000
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);


// exporting Schema
module.exports.feedbackSchema = feedbackSchema 

module.exports.Feedback = Feedback;
