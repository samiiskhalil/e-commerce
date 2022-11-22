const express = require('express');
const taskController=require('../controllers/taskController.js')
const userMiddleware=require('../middleware/usersMiddleware.js')
const mongoose = require('mongoose')
const taskRouter=express.Router()
taskRouter.post('/create-task',userMiddleware.verifyToken,taskController.createTask)
taskRouter.get('/',userMiddleware.verifyToken,taskController.getTasks)
taskRouter.post('/update-task',userMiddleware.verifyToken,taskController.updateTask)
taskRouter.delete('/delete-task',userMiddleware.verifyToken,taskController.deleteTask)
module.exports=taskRouter