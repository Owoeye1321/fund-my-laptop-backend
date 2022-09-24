const mongoose = require('mongoose')
const authenticate_user = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Provide first name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'Provide an email'],
    unique: true,
    // validate: {
    //   validator: validator.isEmail,
    //   message: 'Provide a valid email',
    // },
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLength: 8,
  },
  refreshToken: {
    type: String,
  },
})

module.exports = authentication = mongoose.model('user', authenticate_user)
