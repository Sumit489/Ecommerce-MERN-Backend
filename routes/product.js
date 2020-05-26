const express = require("express")
const router = express.Router()
const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product")
const {isAdmin,isSignedin,authenticated}= require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {} = require("../controllers/category")


//params route

router.param("userId",getUserById)
router.param("productId",getProductById)

//all of actual routes
//carete
router.post("/product/create/:userId",isSignedin,authenticated,isAdmin,createProduct)

//read
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)


//update
router.put("/product/:productId/:userId",isSignedin,authenticated,isAdmin,updateProduct)

//delete
router.delete("/product/:productId/:userId",isSignedin,authenticated,isAdmin,deleteProduct)
//listing route
router.get("/products",getAllProducts)
router.get("/products/categories", getAllUniqueCategories)
module.exports = router