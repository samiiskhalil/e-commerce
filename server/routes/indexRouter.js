const express = require('express')
const productModel=require('../models/Product.js')
const router=express.Router()
// gets all products
router.get('/',async (req,res)=>{
res.send('a')
})
router.patch('/',async (req,res)=>{
    if(req.body.quantity===0){
       return res.json({success:false,msg:'no more'})
        }
    let product= await productModel.findById(req.body._id)
    product.quantity=product.quantity-1
    await product.save()
    console.log(product)
    const products=await productModel.find()
    res.status(201).json({success:true, products:products})
})
module.exports=router