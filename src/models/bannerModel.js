const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bannerSchema = Schema({
  
  index: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  types: {
    type: String,
    required: true
  },
  webs: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  expired: {
    type: Date
  },
  Active: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;