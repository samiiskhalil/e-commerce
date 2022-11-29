const mongoose = require('mongoose')
const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    path:String,
    describtion:String,
    quantity:Number,
    buyersId:[{
        type:mongoose.Schema.Types.ObjectId,
        default:null
    }]
    
})
module.exports=mongoose.model('Product',productSchema)