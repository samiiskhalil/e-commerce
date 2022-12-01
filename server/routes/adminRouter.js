const express = require('express')
const Product=require('../models/Product.js')
const jwt = require('jsonwebtoken')
const {createProduct}=require('../middleware/middleware.js')
const fs = require('fs');
const {checkPassword,createToken,verifyToken} = require('../middleware/authentication.js');
const path=require('path')
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
res.status(201).json({msg:'image created'})

})
//create product
router.post('/',verifyToken,createProduct,async (req,res)=>{
    try{
        res.status(201).send('adas')
        // const product=await Product.create(req.body.product)
        // console.log(product)
        // res.status(201).json({product:product})
    }
    catch(err){
        res.send(err.message)
    }
})
//delete product
router.delete('/',verifyToken,async(req,res)=>{
    try{
        console.log(req.headers['product-id'])
        const product=await Product.findByIdAndRemove(req.headers['product-id'])
        console.log('removed')    
        res.status(200).json({product:product})
           }
    catch(err){
        res.send(err.message)
    }
})
module.exports=router