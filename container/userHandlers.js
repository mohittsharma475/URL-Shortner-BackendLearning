const userModel = require("../models/userModel");
const {v4:uuidv4} = require("uuid")
const {setUser,getUser} =  require("../utils/auth");

async function handleSignUP(req, res) {
 console.log(req.body);
  const { name, email, password } = req.body;
  await userModel.create({
    name,
    email,
    password,
  });

  return  res.redirect('/login');
}

async function handlelogin(req,res){

    const {email,password} = req.body;
    const user = await userModel.findOne({email,password});

    if(!user) res.render("login",{
        error:"Invalid USername or password",
    })
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie("uid",sessionId);

    return  res.redirect('/');




}

module.exports = {
    handleSignUP,
    handlelogin,
}
