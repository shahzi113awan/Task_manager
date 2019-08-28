const express = require("express");
const app = express();
require("./mongoose");
const User = require("./models/user");
const Task = require("../src/models/Task");
const urouter = require('./routers/user')
const trouter =require('./routers/task')
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/auth')
const multer = require('multer')
const port = process.env.PORT;
//.......................................................middleware........................................//
// app.use((req,res,next)=>{
//    res.status(503).send('service down!')
   
    // if(req.method=='GET')
    // res.send('no!')
    // else
    // next()

// })
app.use(express.json());
//.........................................................to use routers..........................................//
app.use(urouter)
app.use(trouter)


// const upload = multer({
//      dest:'avatars',
//      limits:{
//        fileSize:1000000
//      },
//      fileFilter(req,file,cb){
//        if(!file.originalname.match(/\.(doc|docx)$/)){
//          return cb(new Error('please upload a word docs '))
 
//        }
//        cb(undefined,true)
  
//      }
 
//    })
  
//................................................................................................................//

app.listen(port, () => {
    console.log("server is up on" + port);
 });

//  const myfun=async()=>{
//      const token= jwt.sign({_id:'11111'},'whats',{expiresIn:'1 day'})
//      console.log(token)
 
//     const data = jwt.verify(token,'whats')
//     console.log(data)
//     }
//     myfun()

//   const func = async()=>{
//       const pass ='fuckmyass'
//       const hashed = await bcrypt.hash('pass',8)
//       console.log(pass)
//       console.log(hashed)
  
//     }
//   func()

/*
const main = async()=>{
     const task =await Task.findById('5d64219791c4d81fa4f84f07')
     await task.populate('owner').execPopulate()
     console.log(task.owner)

     const user =await User.findById('5d6426f24370d621ccbbdb1a')
    await user.populate('tasks').execPopulate()
     //console.log(user.tasks)
}
main()*/


   //app.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
     //res.send()
  // })