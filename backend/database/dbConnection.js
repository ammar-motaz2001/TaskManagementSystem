import { Sequelize } from "sequelize" //EC6 

//connection to database by ORM (Sequalize)
const dbConnection=new Sequelize('task mangement system','root','',{
    host:"localhost",
    dialect:"mysql" //
})

dbConnection.authenticate().then(()=>{ // to ensure that the connect of database is done or not 
    console.log("Database is Connected")
}).catch((err)=>{
    console.log("Database disConnected")
})

export default dbConnection