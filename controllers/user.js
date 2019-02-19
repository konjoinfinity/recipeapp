const User = require("../models/User");
const { Recipe } = require("../models/Recipe");

module.exports = {
  show: (req, res) => {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "recipies",
        options: { limit: 5, sort: { createdAt: -1 } }
      })
      .then(user => {
        res.render("user/show", { user });
      });
  },
  new: (req, res) => {
    res.render("user/new");
  },
  create: (req, res) => {
    User.create({
      email: req.body.email,
      password: req.body.password
    }).then(user => {
      res.redirect(`/user/${user._id}`);
    });
  }
};
