const express = require('express')
const Task = require('../models/Task')
const bcrypt = require('bcryptjs')
const auth = require ('../middleware/auth')
const User = require('../models/user')
const router = new express.Router

//...................................................create tasks.............................//
router.post("/tasks",auth, async (req, res) => {
    try {
      //const task = new Task(req.body);
      const task = new Task({
        ...req.body,
        owner:req.user._id
      })
      await task.save();
      res.send(task);
    } catch (e) {
      res.status(500).send();
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch((er)=>{
    //     console.log(er)
    // })
    // }catch(e){
    // console.log(e)
    // }
  
    //     console.log(req.body)
    //   var task=new Task(req.body)
    //   console.log(task)
    //   //const str = JSON.stringifyask)
    //   task.collection.insertMany().then(()=>{
  
    //       res.send(task)
    //   }).catch((e)=>{
    // res.status(400).send()
    //   })
  });

  //...............................................................find task by id..........................//
  
  router.get('/tasks/:id',auth,async(req,res)=>{
      const _id=req.params.id
      try{
          const task = await Task.findOne({_id , owner:req.user._id})
          if(!task){
             return res.status(404).send()
          }
          res.send(task)
  
      }catch(e){
  res.status(500).send()
  console.log(e)
      }
  })


  router.get('/tasks' , auth ,async(req,res)=>{

    sort={}
    match={}
    if(req.query.completed){
      match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy)
    {
      const parts = req.query.sortBy.split(':')
      sort[part[0]]= part[1]==='desc'?-1:1 
    }
    try{

      //const tasks = await Task.find({owner:req.user._id})
      //await req.user.populate('tasks').execPopulate()

       await req.user.populate({
         path:'tasks',
         match,
         options:{
           limit:parseInt(req.query.limit),
           skip:parseInt(req.query.skip),
           sort
         }
        
       }).execPopulate()
      res.send(req.user.tasks)

    }
    catch(e){
      console.log(e)
      res.status(500).send(e)
    }
  })

   //................................................update tsk by id ............................//
      
       router.patch("/tasks/:id",auth, async (req, res) => {
        const updates = Object.keys(req.body);
        const allowedUpdates = ["completed"];
        const isValidUpdate = updates.every(update =>
          allowedUpdates.includes(update)
        );
        if (!isValidUpdate) {
          res.status(400).send({ error: "soory unable to update" });
        }
      
        try {
    const task = await Task.findById({_id:req.params.id,owner:req.user._id})
    if (!task) {
      res.status(404).send({error:'task dosent even fukin exists!'});
    }
    updates.forEach((update)=>task[update] = req.body[update])
    await task.save()
        //   const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true
        //   });
          
          res.send(task)
        } catch(error) {error:'unable to fukin connect!'}
      });
      router.delete('/tasks/:id',auth,async(req,res)=>{
        try{
          const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
          if(!task){
            res.status(404).send()
          }
          res.send(task)

        }catch(e){
          res.status(500).send()

        }
      })


module.exports = router