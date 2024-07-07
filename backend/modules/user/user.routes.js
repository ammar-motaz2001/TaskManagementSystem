import express from 'express'
import { signIn, signUp } from './user.controller.js'
import { checkEmailExist } from '../../middleware/checkEmailExist.js'

let userRouter=express.Router()

userRouter.post('/signup',checkEmailExist,signUp)
userRouter.post("/signin",signIn)

export default userRouter