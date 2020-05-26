const express = require("express");
var router = express.Router()
const {signout,signup,signin,isSignedin} = require("../controllers/auth")
const {check,validationResult } = require("express-validator")



router.post("/signup",[
    check("name","name should be 3 character").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atlease 3 character").isLength({min:3}),
],
signup
)   

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:1}),
],
signin
)   


router.get("/signout",signout)
router.get("/testroute",isSignedin, (req,res)=>{
    res.json(req.auth)
})


module.exports = router;