const mongoose = require('mongoose')
const Joi = require('@hapi/joi')
const moment = require('moment')

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
    default: 'pending'
  },
  forwardTo: {
    type: mongoose.Schema.Types.ObjectId
  },
  feedback: {
    type: String,
    minlength: 3,
    maxlength: 5000
  },
  date: {
    type: String,
    default: moment().format('MMMM Do YYYY, h:mm:ss a')
  }
})

const Complaint = mongoose.model('Complaint', complaintSchema)

function validateComplaint(complaint) {
  const schema = Joi.object({
    citizenship: Joi.string().required(),

    category: Joi.string().required(),

    description: Joi.string().min(10).max(10000).required(),

    feedback: Joi.string()
  })

  return schema.validate(complaint)
}

module.exports.Complaint = Complaint
module.exports.validateComplaint = validateComplaint
