const express = require('express')
const router=express.Router()
// gets all products
router.get('/',async (req,res)=>{
res.send('a')
})
module.exports=router