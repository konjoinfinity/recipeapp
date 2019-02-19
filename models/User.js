const mongoose = require("../db/connection");
const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  password: String,
  recipies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe"
    }
  ]
});

module.exports = mongoose.model("User", User);
