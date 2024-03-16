const express = require("express");

const staticRouter = express.Router();

staticRouter.get("/", (req, res) => {
  return res.render("home");
});

module.exports = staticRouter;
