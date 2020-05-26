const express = require("express")
const router = express.Router()

const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user")
const {isSignedin,isAdmin,authenticated } =require("../controllers/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedin,authenticated,getUser)
router.put("/user/:userId",isSignedin,authenticated,updateUser)


router.get("/orders/user/:userId",isSignedin,authenticated,userPurchaseList)




module.exports = router