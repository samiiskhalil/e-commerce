const mongoose = require('mongoose')
const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    path:String,
    describtion:String,
    quantity:Number,
    
})
module.exports=mongoose.model('Product',productSchema)