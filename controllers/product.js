const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"product not available"
            })
        }
        req.product =product
        next();
    })
}

exports.createProduct = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions =true

    form.parse(req,(err,fields,File)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        //destructure the field
        const {price,description,name,category,stock,} = fields

        if(
            !name ||
            !description||
            !price||
            !category||
            !stock
        ){
            return res.status(400).json({
                error:"please include all fields"
            })
        }

        

        let product = new Product(fields)

        //handle file here
        if(File.photo){
            if(File.photo.size > 2097152 ){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(File.photo.path)
            product.photo.contentType= File.photo.type
        }

        //save to the db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"product is not saved"
                })
            }

            res.json(product)
        })
    })
}

exports.getProduct = (req,res) =>{
    req.product.photo = undefined


    return res.json(req.product)
}
//middleware
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res) =>{
    let product = req.product
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
                error:"not deleted"
            })
        }

        res.json({
            message:"deletion success",
            deletedproduct
        })
    })
}

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions =true

    form.parse(req,(err,fields,File)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        //updation code
        let product = req.product
        product = _.extend(product,fields)

        //handle file here
        if(File.photo){
            if(File.photo.size > 2097152 ){
                return res.status(400).json({
                    error:"file size too big"
                })
            }
            product.photo.data = fs.readFileSync(File.photo.path)
            product.photo.contentType= File.photo.type
        }

        //save to the db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"product is not updated"
                })
            }

            res.json(product)
        })
    })
}
//product listing
exports.getAllProducts = (req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) :8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"no product found"
            })
        }
        res.json(products)
    })
}

exports.updateStock = (req,res,next) =>{
    let myOperations = req.body.order.products.map(prod=>{
        return {
            updateOne:{
                filter:{_id: prod._id},
                update:{
                    $inc:{
                        stock: -prod.count
                        ,sold: +prod.count
                    }
                }
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"bulk operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"no category found"
            })
        }

        req.json(category)
    })
}