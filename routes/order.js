const express = require("express")
const router = express.Router()

const {isAdmin,isSignedin,authenticated}= require("../controllers/auth")
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product")

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus} = require("../controllers/order")
//params
router.param("userId",getUserById)
router.param("orderId",getOrderById)


//actuals routes
//create
router.post("/order/create/:userId",isSignedin,authenticated,pushOrderInPurchaseList,updateStock,createOrder)


//read
router.get("/order/all/:userId",isSignedin,authenticated,isAdmin,getAllOrders)
//status of order
router.get("/order/status/:userId",isSignedin,authenticated,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedin,authenticated,isAdmin,updateStatus)

module.exports = router