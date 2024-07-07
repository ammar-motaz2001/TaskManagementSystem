import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";
import { userModel } from "./user.model.js";

export let taskModel=dbConnection.define('task',{
    title:{
        type:DataTypes.STRING(50),
        allowNull:false // To Make A value Not Null
    },
    description:{
        type:DataTypes.STRING(600)
    },

    status:{
        type:DataTypes.STRING(30),
        allowNull:false,
        values:DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
        defaultValue:'Pending'
    },
 })
userModel.hasMany(taskModel,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
taskModel.belongsTo(userModel)