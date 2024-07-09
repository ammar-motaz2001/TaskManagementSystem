import express from 'express'
import { addTask, deleteTask, getAllTasks, getSingleTask, updateTask } from './task.controller.js'
import { verifyToken } from '../../middleware/verifyToken.js'
const taskRouter=express.Router() //refers to how an application's endpoints respond to client requests.

taskRouter.route('/tasks')
.post(verifyToken,addTask)
.get(verifyToken,getAllTasks)
taskRouter.route("/tasks/:id")
.get(verifyToken,getSingleTask)
.put(verifyToken,updateTask)
.delete(verifyToken,deleteTask)

 export default taskRouter