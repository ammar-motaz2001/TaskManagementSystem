import { Sequelize } from "sequelize" //EC6 

//connection to database by ORM (Sequalize)
const dbConnection = new Sequelize("mysql://uxucpekdpgaqdt6m:gbr5QLAcHeDel3gQuYty@bxtahtqtgwm9jkjptlo7-mysql.services.clever-cloud.com:3306/bxtahtqtgwm9jkjptlo7");

dbConnection.authenticate().then(()=>{ // to ensure that the connect of database is done or not 
    console.log("Database is Connected")
}).catch((err)=>{
    console.log("Database disConnected")
})

export default dbConnection