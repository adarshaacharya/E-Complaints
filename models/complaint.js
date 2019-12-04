const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { feedbackSchema } = require('./feedback')

const complaintSchema = new mongoose.Schema({
  citizenship: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000
  },
  status: {
    type: String,
    default: "pending"
  },
  feedback : {
    type : feedbackSchema
  }
});

const Complaint = mongoose.model("Complaint", complaintSchema);

function validateComplaint(complaint) {
  const schema = Joi.object({
    citizenship: Joi.string().required(),

    category: Joi.string().required(),

    description: Joi.string().min(10).max(10000).required()
  });

  return schema.validate(complaint)
}

module.exports.Complaint = Complaint;
module.exports.validateComplaint = validateComplaint;