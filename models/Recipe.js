const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const Comment = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Recipe = new Schema({
  content: String,
  title: String,
  description: String,
  ingredients: String,
  instructions: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [Comment]
});

module.exports = {
  Recipe: mongoose.model("Recipe", Recipe),
  Comment: mongoose.model("Comment", Comment)
};
