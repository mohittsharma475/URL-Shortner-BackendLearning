const {getUser} =  require("../utils/auth");


async  function restrictTologgedInUserOnly(req,res,next){


    console.log(req.cookies);
    const userUid = req.cookies?.uid;
    if(!userUid){
        return res.redirect("/login");
    }    

    const user = getUser(userUid);

    if(!user) return res.redirect("/login")

    req.user = user;
    next();
}


async function checkAuth(req,res,next){
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    req.user = user;

    next();
}


module.exports = {
    restrictTologgedInUserOnly,
    checkAuth,
}