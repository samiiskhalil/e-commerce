const express = require('express')
const Product=require('../models/Product.js')
const jwt = require('jsonwebtoken')
const {createProduct}=require('../middleware/middleware.js')
const fs = require('fs');
const {checkPassword,createToken,verifyToken} = require('../middleware/authentication.js');
const path=require('path')
const customerModel=require('../models/Customer.js')
const multer = require('multer');
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images/')
    },
    filename:(req,file,cb)=>{
        cb(null,req.headers['image-name']+'.jpg')
    }
})
const upload=multer({storage:storage})
const router=express.Router()
//login admin

router.post('/login',checkPassword,createToken,async(req,res)=>{
    try{
        // res.send
    res.status(201).json({token:req.token})        
    }
    catch(err){
        res.json({err:err.message})
    }
})
// get products
router.get('/',async(req,res)=>{
    try{
    const products=await Product.find()

    res.status(200).json({products:products})
        }
    catch(err){
        res.send(err.message)
    }

})
// create image
router.post('/image',verifyToken,upload.single('image'),async (req,res)=>{
    const products=await Product.find()
    res.status(201).json(products)

})
//create product
router.post('/',createProduct,async (req,res)=>{
    try{
        const products=await Product.find()
        res.status(201).json(products)
        // const product=await Product.create(req.body.product)
        // console.log(product)
        // res.status(201).json({product:product})
    }
    catch(err){
        res.send(err.message)
    }
})
//delete product
router.get('/a',verifyToken,async(req,res)=>{
    res.send(req.token)
})
router.delete('/',verifyToken,async(req,res)=>{
    try{
        if(req.token)
        console.log('aaaa')

        const product=await Product.findByIdAndRemove(req.headers['product-id'])
        console.log('removed')    
        const products=await Product.find()
        res.status(200).json(products)
           }
    catch(err){
        res.send(err.message)
    }
})
// get customers orders
router.get('/orders',verifyToken,async (req,res)=>{
try{
    const customers=await customerModel.find()
    let a=[]
    for(let i=0;i<customers.length;i++){
 let s= await   customers[i].populate('invoice.productId')
    a.push(s)}
console.log(a[0].invoice) 
    res.status(200).json(a)    
}
catch(err){
    res.send(err)
}
})
module.exports=router