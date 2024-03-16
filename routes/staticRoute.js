const express = require("express");

const staticRouter = express.Router();

// staticRouter.get("/", (req, res) => {
//   return res.render("home");
// });


staticRouter.get("/signup",(req,res)=>{
  return res.render("signup");
})

staticRouter.get("/login",(req,res)=>{
  return res.render("login");
})

module.exports = staticRouter;
