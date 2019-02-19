const express = require("express");
const router = express.Router();

router.use("/", require("./application.js"));
router.use("/user", require("./user"));
router.use("/recipe", require("./recipe"));

router.all("*", (req, res) => {
  res.status(400).send();
});

module.exports = router;
