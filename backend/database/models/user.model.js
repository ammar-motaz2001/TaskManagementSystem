import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";
import { taskModel } from "./task.model.js";
export let userModel=dbConnection.define('user',{
    name:{
     type:DataTypes.STRING(50),// String => inside map to varChar(255)
     allowNull:false,
    },
    email:{
     type:DataTypes.STRING(50),
     allowNull:false,
    },
    password:{
     type:DataTypes.STRING(255), 
     allowNull:false
 
    },
    role:{
     type:DataTypes.STRING(5),
         allowNull:false,
         values:DataTypes.ENUM('user','admin'),
         defaultValue:'user'
    }
 })
userModel.hasMany(taskModel);
taskModel.belongsTo(userModel)
