const User = require("../models/User");
const { Recipe } = require("../models/Recipe");
const bcrypt = require("bcrypt-nodejs");

const createPassword = password =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.find({}).remove(() => {
  Recipe.find({}).remove(() => {
    let konjo = User.create({
      email: "konjo@konjo.com",
      password: createPassword("konjo123")
    }).then(user => {
      Promise.all([
        Recipe.create({
          content: "Nachos",
          author: user._id
        }).then(recipe => {
          user.recipies.push(recipe);
        }),
        Recipe.create({
          content: "Salad",
          author: user._id
        }).then(recipe => {
          user.recipies.push(recipe);
        })
      ]).then(() => {
        user.save(err => console.log(err));
      });
    });

    let josh = User.create({
      email: "josh@josh.com",
      password: createPassword("joshjosh")
    }).then(user => {
      Promise.all([
        Recipe.create({
          content: "BBQ",
          author: user._id
        }).then(recipe => {
          user.recipies.push(recipe);
        }),
        Recipe.create({
          content: "Chikin Parm",
          author: user._id
        }).then(recipe => {
          user.recipies.push(recipe);
        })
      ]).then(() => {
        user.save(err => console.log(err));
      });
    });
  });
});
