const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const discoverSchema = Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags"
  }],
  image: {    
    data: Buffer,
    contentType: String
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  statuActive: {
    type: Boolean,
    default: false
  }
})

const Discover = mongoose.model('Discover', discoverSchema);

module.exports = Discover;