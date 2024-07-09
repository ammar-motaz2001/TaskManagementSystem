import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";

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

