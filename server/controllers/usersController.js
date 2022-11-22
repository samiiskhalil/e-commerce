const userModel=require('../models/userModel.js')
class usersController{
    constructor() {
        
    }
    static async checkUser(req,res,next){
        try{
            console.log('a')
            const user=await userModel.findOne({email:req.body.email})
        if(user) 
        return res.status(400).json({data:'email already exists'})
    return next()}
    catch(err){
        res.send(err.message)
    }
    }
    static async getUsers(req,res){
        try{
            let users=await userModel.find()
            return res.status(200).json(users)
    }
catch(err){
    res.send(err.message)
}
}

static async getUser(req,res){
    // console.log(req.params)
    try{
    const user=await userModel.findById(req.params.id)
    console.log(user)
    return res.status(200).json(await user.populate('tasksId'))
    }
    catch(err){
        console.log(err)
    }
}
    static async createUser(req,res,next){
    const user=await userModel.create({
        ... req.body
       }) 
       req.user=user
       return next()

}
static async sendToken(req,res){
    res.status(201).json(req.token)
}
}
module.exports=usersController