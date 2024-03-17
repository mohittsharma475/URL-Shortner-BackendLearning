const express = require("express");
const { urlModel } = require("../models/urlModel");

const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {

  if(!req.user) return res.redirect("/login");
  const allURL = await urlModel.find({createdBy:req.user._id});
  return res.render("home",{
    urls:allURL
  });
});


staticRouter.get("/signup",(req,res)=>{
  return res.render("signup");
})

staticRouter.get("/login",(req,res)=>{
  return res.render("login");
})

module.exports = staticRouter;
