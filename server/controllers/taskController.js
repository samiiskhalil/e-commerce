const taskModel =require('../models/taskModel.js')
const userModel=require('../models/userModel.js')
class taskController{
    constructor(){
    }
    static async getTasks(req,res){
        try{
            console.log(req.token)
            const tasks=await taskModel.find({userId:req.body.userId})
            if(!tasks){
                res.send('aa')
            }
            return  res.status(200).json(tasks)}
        catch(err){
           return res.status(400).send(err.message)
        }
    }
    static async createTask(req,res){
        const task=await taskModel.create(req.body.task)

        let user=await userModel.findById(req.body.task.userId)
        await user.tasksId.push(task.id)
        await user.save()
        console.log(user)
        return res.status(201).json(task)
    }
static async deleteTask(req,res){
    await taskModel.findByIdAndDelete(req.body.task.id)
    return res.status(200).json({msg:'deleted'})
}
static async updateTask(req,res){
    try{
    let task=await taskModel.findById('637403747f4a30b9c932d4a9')
    task.title=req.body.task.title
    task.describtion=req.body.task.describtion
    task.finishedFlage=req.body.task.finishedFlage
    await  task.save()
   return res.status(201).json(task)}
   catch(err){
    res.status(400).send(err.message)
   }
}
}
module.exports=taskController