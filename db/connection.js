const mysql = require("mysql2");

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your mysql username
        user: 'root',
        //your mysql password
        password: 'HelloWorld!',
        database: 'employeeTracker_db'
    },
     console.log('Connected to the Employee Tracker database')
)

module.exports = db;