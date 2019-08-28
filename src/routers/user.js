const express = require('express')
const User = require('../models/user')
const Task = require ('../models/Task')
const auth =require ('../middleware/auth')
const jwt = require('jsonwebtoken')
const mongoose= require('mongoose')
const multer = require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail}=require('../../Emails/account')
const router = new express.Router()




router.post("/users", async (req, res) => {
  const user = new User(req.body)  
  try {
      
      
      await user.save()
      sendWelcomeEmail(user.email,user.name)

      const token = await user.generateAuthToken()
      res.status(201).send({user,token});
    } catch (e) {
      console.log(e)
      res.status(500).send();

    }
  
    // res.send('testing')
    //  console.log(req.body)
    // const user = new User(req.body)
    // user.save().then(()=>{
    // res.send(user)
    // }).catch((e)=>{
    //     console.log(e)
    //     res.send(e)
  
    // })
})
    router.post('/users/login',async (req,res)=>{
        try{
            const user=await User.findByCredentials(req.body.email,req.body.password)
            const token = await user.generateAuthToken()
            console.log({user,token})
            res.send({user,token})
  
        }
        catch(e){
            console.log(e)
            res.status(400).send()
  
        }
    })
  

  
  //....................................................get user by name ........................//
 
  router.get("/users/me",auth, (req, res) => {
    res.send(req.user)
 
    //  const users = User.find({})
  //       res.send(users);
  //       console.log(users);
      }
    );
  
  //.........................................................get user by id................................//
  // 
  




    //     console.log(req.params.id)
  
    //    const _id = req.params.id
  
    //     User.findById(_id).then((user)=>{
    // if(!user)
    // {
    //  res.status(404).send()
  
    // }
    // res.send(user)
    //     }).catch((e)=>{
    //         res.status(500).send()
    // })
  
  
    //});//////.............................................................................................
 
  
  //............................................................find user by id..................................//
  
  router.delete('/users/me',auth, async (req,res)=>{
      try{
        //const user = req.user
         // const user = await User.findByIdAndDelete(req.params.id)
        await  req.user.remove()
          // if(!user){
          //     res.status(404).send()
          // }

          res.send(req.user)
  
      }
      catch(e){
          res.status(500).send()
          console.log(e)
  
      }
  })
  
  //........................................................update user by id..................................//
  router.patch("/users/me",auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "age", "email", "password"];
    const isValidUpdate = updates.every(update =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      res.status(400).send({ error: "not valid" });
    }
    try {
       // const user = await User.findById(req.params.id)
       const user = req.user 
       updates.forEach((update)=>user[update]=req.body[update])
        await user.save()


    //   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    //   });
      if (!user) {
        res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      console.log(e)
      res.status(500).send(e);
    }
  })
  router.post('/users/logout' , auth , async (req,res)=>{
    try{
      req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
      })
await req.user.save()
res.send()
    }catch(e) {
      res.status(500).send()


    }
  })
  router.post('/users/logoutall',auth,async(req,res)=>{
    try{
      req.user.tokens =[]
      await user.save(  )
      res.send()

    }
    catch(e){
      res.status(500).send(e)

    }
  })

 //........................................//
 const upload = multer({

  limits:{
       fileSize:1000000

  },
  fileFilter(req,file,cb){
       if(!file.originalname.match(/\.(jpeg|Jpg|png)$/)){
       return cb(new Error('invalid format'))
       }
  
  cb(undefined,true)}
 }) 
router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>
{
  const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
res.send()
},(error,req,res,next)=>{
  res.status(400).send({error: error.message})

})

//..................................................//
router.get('/users/:id/avatar',async(req,res)=>{
  try{
    const user = await User.findById(req.params.id)
    if(!user|user.avatar){
      throw new Error
    }
    res.set('Content-Type','image/png')
    res.send(user.avatar)

  }catch(e){

  }
})
 
  //.....................................To handel not allowed updates............................//
  // const update= Object.keys(req.body)
  // const allowedUpdates = ['completed']
  // const isValidUpdate = updates.every(update=>allowedUpdates.includes(update))
  module.exports=router
//,.......................................................tareqa/.....................................//
  /*
  1-express library import karni
  2-models import krnay
  3-new object bnana router ka new express.Router
  4-replace app with router
  module export kar deny

  */