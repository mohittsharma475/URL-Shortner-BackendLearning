const express = require("express");
const handleSignUP = require("../container/userHandlers");
const router = express.Router();

router.post("/signup",handleSignUP.handleSignUP);
router.post("/login",handleSignUP.handlelogin);


module.exports = router;