const jwt = require('jsonwebtoken')
const User = require ('../models/user')
const auth = async (req,res,next)=>{
    try{
        //console.log(req.header('Authorization'))
    const token = req.header('Authorization').replace('Bearer ','')
    const decoded =  jwt.verify(token, Buffer.from(process.env.SECRET_KEY,'base64'))
    //console.log(decoded)
    const user = await User.findOne({_id:decoded._id,'tokens.token':token})
    //console.log(token)
    if(!user)
    {
        throw new Error();
        
    }
    req.token = token
    req.user = user
    next()
    //console.log(token)
    }
    catch(e){
        console.log(e)
        res.status(401).send('authorization failed')
    }
}
module.exports=auth