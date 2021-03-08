const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const trendSchema = Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  tag: [{
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

const Trends = mongoose.model('Trends', trendSchema);

module.exports = Trends;