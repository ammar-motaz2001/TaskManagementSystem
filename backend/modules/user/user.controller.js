import { where } from "sequelize"
import { userModel } from "../../database/models/user.model.js"
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { taskModel } from "../../database/models/task.model.js";

const signUp=catchError(async(req,res)=>{
    let user=await userModel.create(req.body) 
    
    user.password=undefined // i did it becouse when response come don't give me a password

    return res.json({message:"Signed Up Successfully",user})
})
    const signIn=catchError(async(req,res,next)=>{
    let user= await userModel.findOne({where:{email:req.body.email}}) //To ensure that the user exist
    
    if(user&& bcrypt.compareSync(req.body.password,user.dataValues.password)){ //to compare password from request with the password in database
        jwt.sign({userId:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,(err,token)=>{ //sign token
            return res.json({message:"Success",token}) 
        })
     }else{  
        return next(new AppError("Invalid Email or Password",401))
    }
    
})

// const getAllusers=catchError(async(req,res)=>{
//     let {count,rows}=await userModel.findAndCountAll({
//         include:
//         {
//             model:taskModel,
//         }
//     })
//    return res.json({message:"success",numofusers:count,Allusers:rows})

// })
   

export{
    signUp,
    signIn,
    // getAllusers
}