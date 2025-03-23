const mysql = require('mysql2')
require('dotenv').config()
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.DBSECRETPASS,
    database:"store_rating"
})
db.connect((err)=>{
    if(err){
        console.log("Error while connecting mysql",err);
    }
    else{
        console.log("MYSQL connected successfully!");
    }
})

module.exports=db;