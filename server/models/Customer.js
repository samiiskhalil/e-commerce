const mongoose = require('mongoose')
const customerSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    productsBoughtId:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]
    
})
module.exports=mongoose.model('Customer',customerSchema)