const mongoose = require('mongoose')
const customerSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    invoice:[{
        productId:{type:mongoose.Schema.Types.ObjectId,
        ref:'Product'},
        count:Number
        
}]

        
        
    
    
})
module.exports=mongoose.model('Customer',customerSchema)