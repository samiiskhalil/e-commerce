const usersController=require('../controllers/usersController.js')
const userMiddleware=require('../middleware/usersMiddleware.js')
const express = require('express')
const usersRouter=express.Router()
//all useres
usersRouter.get('/',userMiddleware.verifyToken,usersController.getUsers)
usersRouter.get('/',userMiddleware.verifyToken,usersController.getUser)
usersRouter.post('/signup',usersController.checkUser,usersController.createUser,userMiddleware.createToken)
usersRouter.post('/login',userMiddleware.findUser,userMiddleware.createToken,usersController.sendToken)

module.exports=usersRouter