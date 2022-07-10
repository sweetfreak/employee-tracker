const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection.js');


const startEmployeeTracker = () => {
    console.log("Welcome to employee tracker!")
    chooseTask();
}

const chooseTask = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "Please choose a new task:",
            choices: ['View Departments', 'View Positions', 'View Employees', 'Add Department', 'Add Position', 'Add Employee', 'Update Employee', 'BONUS: Delete Department', 'BONUS: Delete Position', 'BONUS: Delete Employee'],
            validate: nameInput => {
                if (taskInput) {
                    return true;
                } else {
                    console.log("You must choose a task or press ^C to exit.");
                    return false;
                }
            }
        }
    ])
    .then(input => {
        switch(input.task){
            case 'View Departments':
                getDepartments();
                break;
            case 'View Positions':
                getPositions();
                break;
            case 'View Employees':
                getEmployees();
                break;

            case 'Add Department':
                addDepartment();
                break;
            case 'Add Position':
                addPosition();
                break;
            case 'Add Employee':
                addEmployee();
                break;    

            case 'Update Employee':
                updateEmployee();
                break;    

            default:
                console.log("Sorry, these functions aren't ready yet");
                chooseTask();
        }
    })
}

const getDepartments = () => {
    const sql = `SELECT * FROM departments`;
    
    db.query(sql, (err, results) => {
        if (err) {
            err.message;
            return;
        }
        console.log("...loading departments...")
        console.table(results);
        })
        chooseTask();
}
    


const getPositions = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {

    })
    .catch ()    
}

const getEmployees = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {

    })
    .catch ()    
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) {
                res.status(500).json({error: err.message});
                return;
            }
            res.json({
                message: 'success',
                data: rows
            });
        })
    })
    .catch ()    
}

const addPosition = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {

    })
    .catch ()    
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {

    })
    .catch ()    
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "Enter your name of the department:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name.");
                    return false;
                }
            }
        }
    ])
    .then((input) => {

    })
    .catch ()    
}


startEmployeeTracker();