const mongoose = require('mongoose');
const cors = require('cors');
const userRouter=require('./routes/usersRouter.js')
const taskRouter=require('./routes/taskRouter.js') 
const userModel = require('./models/userModel.js');
const taskModel = require('./models/taskModel.js');
const express = require('express')
require('dotenv').config()
const app=express()
console.log(process.env.DATABASE_URL)
mongoose.connect('mongodb://localhost/task-manager',()=>console.log('connected'),(err)=>console.log(err))
app.use(cors({
    origin:'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('api/users',userRouter)
app.use('api/task',taskRouter)
app.get('/',(req,res)=>{
    console.log('a')
    res.send('a')
})
app.listen(3000,()=>console.log('htt10'))