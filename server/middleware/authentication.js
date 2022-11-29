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
    const token = req.headers.authorization.split(' ')[1]
     jwt.verify(token,process.env.JWT_SECRET,(data,err)=>{
    if(err)
    console.log(err)    
    // res.status(403).json({msg:'you are not admin !'})
      req.token=data
    })
    return next()
}
module.exports={createToken,checkPassword,verifyToken}