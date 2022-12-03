const express = require('express')
const customerModel=require('../models/Customer.js')
const productModel=require('../models/Product.js')
const router=express.Router()
// gets all products
router.post('/',async (req,res)=>{
const customer=await customerModel.create({...req.body.form,invoice:req.body.sentCart})
console.log(customer)
res.send('done')
})
router.patch('/',async (req,res)=>{
    if(req.body.quantity===0){
       return res.json({success:false,msg:'no more'})
        }
    let product= await productModel.findById(req.body._id)
    product.quantity=product.quantity-1
    await product.save()
    const products=await productModel.find()
    res.status(201).json({success:true,products})
})
module.exports=router