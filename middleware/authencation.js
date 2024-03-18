const {getUser} =  require("../utils/auth");


function checkForAuthentication(req,res,next){
    const authorizationHeaderValue = req.headers["authorization"];
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWth("Bearer") ){
        return next();
    }

    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = getUser(token);

    req.user = user;
}


function restrictTo(role){
    return function(req,user,next){
        if(!req.user) return res.redirect("login");
    }

    if(!role.include(req.user.role)){
        return res.end("UnAuhtorized");
    }
    return next();
}








// async  function restrictTologgedInUserOnly(req,res,next){


//     console.log(req.cookies);
//     const userUid = req.cookies?.uid;
//     if(!userUid){
//         return res.redirect("/login");
//     }    

//     const user = getUser(userUid);

//     if(!user) return res.redirect("/login")

//     req.user = user;
//     next();
// }


// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid;
//     const user = getUser(userUid);

//     req.user = user;

//     next();
// }


module.exports = {
    checkForAuthentication,
    restrictTo
}