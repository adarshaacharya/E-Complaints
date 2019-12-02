// Feedback is given by Particular department Minister
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const feedbackSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 10,
    maxlength: 5000
  },
  status: {
    type: String,
    default: "pending"
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);


// exporting Schema
module.exports.feedbackSchema = feedbackSchema 

module.exports.Feedback = Feedback;
