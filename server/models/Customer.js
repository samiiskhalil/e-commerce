const mongoose = require('mongoose')
const customerSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    location:String,
    productsBoughtId:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
    
})
module.exports=mongoose.model('Customer',customerSchema)