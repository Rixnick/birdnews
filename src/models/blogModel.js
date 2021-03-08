const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = Schema({
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
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Category"
    type: String,
    required: true
  },
  tag: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Tag"
    type: String,
    required: true
  },
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

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;