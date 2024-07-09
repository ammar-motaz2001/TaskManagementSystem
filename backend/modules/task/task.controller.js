import { taskModel } from "../../database/models/task.model.js"
import { userModel } from "../../database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import {AppError } from "../../utils/appError.js"
const addTask=catchError(async(req,res)=>{
   console.log("requser:",req.user)
   req.body.userId=req.user.userId
   console.log(req.body)
    let task=await taskModel.bulkCreate([req.body]) // add task to database
    return res.json({message:"success",task})
})
const getAllTasks=catchError(async(req,res)=>{
   if(!req.user) return res.json({message:"Not user"})
    let {count,rows}=await taskModel.findAndCountAll({
        where:{userId:req.user.userId},
        include:
        {
            model:userModel,
            attributes:{
                exclude:['password']
            }
        }
    })
    console.log(req.user)
   return res.json({message:"success",numofTasks:count,AllTasks:rows})
    
 
 })
 const updateTask=catchError(async(req,res,next)=>{
    let [created]=await taskModel.update({
        title:req.body.title, //to get all updates from (postman)
        description:req.body.description //to get all updates from (postman)
    },{
        where:{
            id:req.params.id
        }
    })
    if(created) return res.json({message:"updated successfully"})
    return next(new AppError("Task Not Found",404))
 })

 const getSingleTask=catchError(async(req,res,next)=>{
    let singleTask=await taskModel.findByPk(req.params.id) //find a task with primaryKey 
    if(singleTask) return res.json({message:"success",singleTask})
        return next(new AppError("Task Not Found",404))
 })

 const deleteTask=catchError(async(req,res,next)=>{
    let created=await taskModel.destroy({
        where:{ //where==IF ,, if id == req.params.id delete the task
            id:req.params.id
        }
    })
    if(created) return res.json({message:"deleted successfully"})
        return next(new AppError("Task Not Found",404))
    })

export{
    addTask,
    getAllTasks,
    updateTask,
    getSingleTask,
    deleteTask
}