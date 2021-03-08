const mongoose = require("mongoose");

const tagsSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    }
  },{ timestamp: true });

const Tags = mongoose.model("Tags", tagsSchema);

module.exports = Tags;
