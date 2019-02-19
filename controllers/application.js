const { Recipe } = require("../models/Recipe");

module.exports = {
  index: (req, res) => {
    Recipe.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
      .then(recipies => {
        res.render("app/index", { recipies });
      });
  }
};
