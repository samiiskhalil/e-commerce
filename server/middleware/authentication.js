const jwt = require('jsonwebToken')
// returns req.token=token
// /api/admin/login||signup
async function createToken(req,res,next){
    try{
        // console.log(req.body)
        const token=await jwt.sign({ access:'given'},process.env.JWT_SECRET,{expiresIn:'2w'})
        req.token=token
        return next()
       }   
    catch(err){
        res.json({err:err.message})
              }
}
// check for password for login
async function checkPassword(req,res,next){
    if(req.body.password===process.env.PASSWORD)
    return next()
}
//verify token
async function verifyToken(req,res,next){
  if(!req.headers.authorization)
        return res.send('no token')
    const tokenBearer=req.headers.authorization.split(' ')
    if(!tokenBearer[1])
    return res.send('no token')
    const token=tokenBearer[1]
    await jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
        if(err)
        return res.send(err)
        req.token=data
        return next()
    })
}
module.exports={createToken,checkPassword,verifyToken}