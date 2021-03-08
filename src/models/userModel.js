const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    lowercase: true
  },
  email: {
    type:String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type:String,
    required: true,
    minlength: 6
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // roles: [{
  //   type: Boolean,
  //   default: true
  // }],
  date: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;