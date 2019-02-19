const { Recipe, Comment } = require("../models/Recipe");
const User = require("../models/User");

module.exports = {
  show: (req, res) => {
    Recipe.findOne({ _id: req.params.id })
      .populate("author")
      .exec(function(err, recipe) {
        Comment.populate(recipe.comments, { path: "author" }, function(
          err,
          comments
        ) {
          recipe.comments = comments;
          res.render("recipe/show", recipe);
        });
      });
  },
  new: (req, res) => {
    User.find({}).then(users => {
      res.render("recipe/new", { users });
    });
  },
  create: (req, res) => {
    Recipe.create({
      content: req.body.recipe.content,
      title: req.body.recipe.title,
      description: req.body.recipe.description,
      ingredients: req.body.recipe.ingredients,
      instructions: req.body.recipe.instructions,
      author: req.body.author
    }).then(recipe => {
      User.findOne({ _id: req.body.author }).then(user => {
        user.recipies.push(recipe);
        user.save(err => {
          res.redirect(`/recipe/${recipe._id}`);
        });
      });
    });
  },
  update: (req, res) => {
    let { content, author } = req.body;
    Recipe.findOne({ _id: req.params.id }).then(recipe => {
      recipe.comments.push({
        content,
        author
      });
      recipe.save(err => {
        res.redirect(`/recipe/${recipe._id}`);
      });
    });
  },
  delete: (req, res) => {
    Recipe.findOneAndRemove({ _id: req.params.id }).then(recipe => {
      res.redirect("/");
    });
  }
};
