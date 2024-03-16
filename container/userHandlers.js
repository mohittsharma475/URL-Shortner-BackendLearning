const userModel = require("../models/userModel");

async function handleSignUP(req, res) {
 console.log(req.body);
  const { name, email, password } = req.body;
  await userModel.create({
    name,
    email,
    password,
  });

  return  res.redirect('/');
}

async function handlelogin(req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({email,password});

    if(!user) res.render("login",{
        error:"Invalid USername or password",
    })

    return  res.redirect('/');




}

module.exports = {
    handleSignUP,
    handlelogin,
}
