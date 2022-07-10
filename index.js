const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection.js');

let departmentsArr = ["Executive", "Marketing", "Accounting",];
let positionsArr = ["CEO", "Marketing Manager", "Marketing Assistant", "Accounting Manager", "Accounting Assistant"];
let employeesArr = ["Jane Doe", "Frank Lin", "Michael Michaelson", "Tina Greene", "Johnny Jacobs"];


const startEmployeeTracker = () => {
    console.log("Welcome to employee tracker!")
    chooseTask();
}

//chooses a task, and starts a new prompt
const chooseTask = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "task",
            message: "Please choose a new task:",
            choices: ['View Departments', 'View Positions', 'View Employees', 'Add Department', 'Add Position', 'Add Employee', 'Update Employee', 'BONUS: Delete Department', 'BONUS: Delete Position', 'BONUS: Delete Employee', 'DELETE ALL'],
            validate: taskInput => {
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

            case 'DELETE ALL':
                deleteAll();
                break;   

            default:
                console.log("Sorry, these functions aren't ready yet");
                chooseTask();
        }
    })
}

//GET DEPARTMENTS
const getDepartments = () => {

    const sql = `SELECT departments.id as Department_ID, departments.dept_name AS Department_Name FROM departments`;

    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("...loading departments...")
        console.table(results);
        })
        chooseTask();
}
    
//GET POSITIONS
const getPositions = () => {
    //const sql = `SELECT * FROM positions JOIN departments ON positions.department_id = departments.id `;
   const sql = `SELECT * FROM positions LEFT JOIN departments ON positions.department_id = departments.id`;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("...loading positions...")
        console.table(results);
        })
        chooseTask();
}

const getEmployees = () => {
   // const sql = `SELECT * FROM employees LEFT JOIN positions ON employees.position_id = positions.id LEFT JOIN departments ON positions.department_id = departments.id`;

   const sql = `SELECT * FROM employees LEFT JOIN positions ON employees.position_id = positions.id LEFT JOIN departments ON positions.department_id = departments.id`;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("...loading employeess...")
        console.table(results);
        })
        chooseTask();  
}

//add department
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
        const sql = `INSERT INTO departments (dept_name) VALUES ('${input.dept_name}')`;
        //add to department array
        departmentsArr.push(input.dept_name);

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("\n-------------\nDepartment Added!\n-------------")
           
            })
            chooseTask();  

    })
    .catch ()    
}

const addPosition = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "position_name",
            message: "Please enter the new position's title:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter a position title");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "salary",
            message: "Please enter the new position's salary':",
            validate: nameInput => {
                if (!NaN) {
                    return true;
                } else {
                    console.log("Enter the salary");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "manager",
            message: "Is this a manager position? Type Y for yes.",
            default: false
        },
        {
            type: 'rawlist',
            name: 'department',
            message: 'Choose a department',
            choices: departmentsArr
        }
    ])
    .then((input) => {
        let isManager;
        if (input.manager === true) {
            isManager = 1;
        };

        const deptID = departmentsArr.indexOf(`${input.department}`) + 1;

        const sql = `INSERT INTO positions (Position, Salary, IsManager, department_id) VALUES ('${input.position_name}', '${input.salary}', ${isManager},  ${deptID})` ;

        //add to positions array
        positionsArr.push(input.position_name);

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("\n-------------\nPosition Added!\n-------------")
           
            })
            chooseTask();  
    })
    .catch ()    
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "Please enter the new employee's first name:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter a name");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "Please enter the new employee's last name':",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter a name");
                    return false;
                }
            }
        },
        {
            type: "rawlist",
            name: "position",
            message: "Please enter the new employee's position:",
            choices: positionsArr
        },
    ])
    .then((input) => {

        const positionID = positionsArr.indexOf(`${input.position}`) + 1;

        employeesArr.push( `${input.first_name} ${input.last_name}`);

        const sql = `INSERT INTO employees (first_name, last_name, position_id) VALUES ('${input.first_name}', '${input.last_name}', '${positionID}')`;

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("\n-------------\nEmployee Added!\n-------------")
           
            })
            chooseTask(); 
    })
    .catch ()    
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: "rawlist",
            name: "employeeToUpdate",
            message: "Please choose an employee to update",
            choices: employeesArr
        },
        {
            type: "input",
            name: "first_name",
            message: "Please update the employee's first name:",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter a name");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "last_name",
            message: "Please update the employee's last name':",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter a name");
                    return false;
                }
            }
        },
        {
            type: "rawlist",
            name: "position",
            message: "Please update the employee's position:",
            choices: positionsArr
        },
    ])
    .then((input) => {

        const employeeID = employeesArr.indexOf(`${input.employeeToUpdate}`) + 1;
        const positionID = positionsArr.indexOf(`${input.position}`) + 1;

        const sql = `UPDATE employees 
        SET first_name='${input.first_name}', last_name='${input.last_name}', position_id=${positionID} 
        WHERE id=${employeeID}`;

        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("\n-------------\nEmployee Updated!\n-------------")
           
            })
            chooseTask(); 

    })
    .catch ()    
}


startEmployeeTracker();