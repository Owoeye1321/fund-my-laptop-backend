// this is the code for ./models.js

const mongoose = require('mongoose')

const uploads = new mongoose.Schema({
  name: String,
  address: String,
  detais: String,
  image: {
    data: Buffer,
    contentType: String,
  },
})

//Image is a model which has a schema imageSchema

module.exports = uploadDetails = mongoose.model('hostelPosts', uploads)
