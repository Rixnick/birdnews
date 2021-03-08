const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blogs",
      },
    ],
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
