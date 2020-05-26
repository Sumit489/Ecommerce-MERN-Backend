const express = require("express")
const router = express.Router()
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category")
const {isAdmin,isSignedin,authenticated} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById)

//actual routes

//add
router.post("/category/create/:userId",isSignedin,authenticated,isAdmin,createCategory)
//retrieve
router.get("/category/:categoryId",getCategory)
router.get("/categories",getAllCategory)
//update

router.put("/category/:categoryId/:userId",isSignedin,authenticated,isAdmin,updateCategory)
//delete
router.delete("/category/:categoryId/:userId",isSignedin,authenticated,isAdmin,removeCategory)

module.exports = router