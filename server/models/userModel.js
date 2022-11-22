const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    userName:String,
    email:{type:String,required:true},
    password:String,
    tasksId:[{type:mongoose.Schema.Types.ObjectId,ref:'taskModel'}]
})
module.exports=mongoose.model('userModel',userSchema)