const mongoose = require('mongoose')
const Joi = require('@hapi/joi')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true
  },
  department: {
    type: String
  },
  role: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

// Joi validation
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string()
      .required()
      .min(5)
      .max(250)
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .required()
      .min(5)
      .max(255)
      .pattern(/^[a-zA-Z0-9]{3,30}$/),
    confirmPassword: Joi.any().required().valid(Joi.ref('password')),
    department: Joi.string(),
    role: Joi.string().required()
  })

  return schema.validate(user)
}

module.exports.User = User
module.exports.validateUser = validateUser

// checking for unique email
userSchema.path('email').validate(async (value) => {
  const emailCount = await mongoose.models.User.countDocuments({
    email: value
  })
  return !emailCount
}, 'The given email already exists. Try new email')
