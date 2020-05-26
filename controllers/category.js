const Category = require("../models/category")
const formidable = require("formidable")
const _ = require("lodash")

exports.getCategoryById =(req,res,next,id) =>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"category not found"
            })
        }

        req.category = cate
        next();
    })
    
}

exports.createCategory = (req,res) =>{
    const category = new Category(req.body)

    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"note able to save category"
            })
        }

        res.json({category})
    })

}

exports.getCategory = (req,res) =>{
    return res.json(req.category);
}

exports.getAllCategory = (req,res) =>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"note able to get category"
            })
        }

        res.json(categories)
    })
}

exports.updateCategory = (req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions =true

    form.parse(req,(err,fields)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        //updation code
        let category = req.category
        category = _.extend(category,fields)

        //save to the db
        category.save((err,category)=>{
            if(err){
                return res.status(400).json({
                    error:"product is not updated"
                })
            }

            res.json(category)
        })
    })
}

exports.removeCategory=(req,res) =>{
    const category = req.category;

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"fail to remove"
            })
        }
        res.json({
            message: category + "succesfully deleted"
        })
    })
}