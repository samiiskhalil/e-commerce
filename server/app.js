const express = require('express')
const bodyParser=require('body-parser')
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose')
const productModel=require('./models/Product.js')
const indexRoute = require('./routes/indexRouter.js');
const adminRouter=require('./routes/adminRouter.js')
const  app=express()
app.use(cors({
    origin:'*'
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.json(),express.urlencoded({extended:true}))
app.use('/',indexRoute)

app.use('/api/admin',adminRouter)
mongoose.connect('mongodb://localhost/e-commerce',()=>console.log('connected to ecommerce dataabase'))
app.listen(1000,()=>console.log('http://localhost:1000'))