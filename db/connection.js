const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/recipeapp");
mongoose.Promise = Promise;
module.exports = mongoose;
