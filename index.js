const db = require("./db");
require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");
const util = require("util");
const { connection, viewDepartment, viewRoles } = require("./db");


console.log("My app is running")



const viewEmployees = async () => {
    let allEmployees = await db.selectAllEmployees()
    console.table(allEmployees)
}

const mainMenu = () => {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do",
        choices: [
        "add a department",
        "add a role", 
        "add an employee", 
        "view departments", 
        "view roles", 
        "view an employee", 
        "update employee's role",
        "exit"
        ]
    })

    .then((answer) => {
        switch (answer.action) {
            case "add a department":
                addDepartment();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmployee();
                break;
            case "view departments":
                viewDepartment();
                break;
            case "view roles":
                viewRoles()
                break;
            case "view an employee":
                viewEmployees();
                break;
            case "update employee's role":
                updateEmployee();
                break;
            default:
                connection.end();
        }
    })

}

const addDepartment = () => {
    inquirer
    .prompt ({
        name: "add a department",
        type: "input",
        message: "What new department would you like to add?"
    })

    .then ((answer) => {
        const department = {
            departmentName: answer.addDepartment
        }
        DB.addDepartment(department).then(Response => {
            console.table(Response)
            viewDepartment()
        })
    })
};

const addRole = async () => {
    let viewDepartment = await db.viewDepartment();
    let departmentList = viewDepartment.map(({id, name}) => ({name: name, value: id}))



    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "What role would you like to add?"

        },

        {
            name: "salary",
            type: "input",
            message: "What is the salary for this role?"
        },

        {
            name: "department",
            type: "rawlist",
            message: "What is the department id?",
            choices: departmentList

            
        }
    ])

    .then (answer => {
        const role = {
            title: answer.title,
            salary: answer.salary ||0,
            department_id: answer.department
        }
        DB.addRole(role).then(response=> {
            console.table (response)
            viewRoles()
        })
    })
};


const addEmployee = () => {

};


const viewDepartment = () => {
    DB.viewDepartment().then(response => {
        console.table(response)
        mainMenu()
    })
};

const viewRoles = () => {
    DB.viewRoles().then(response => {
        console.table(response)
        mainMenu()
    })
}

const updateEmployee = async () => {
    let viewEmployees = await db.viewEmployees();
    let allEmployees = viewEmployees.map(({id, name}) => ({name: name, value: id}))

}
viewEmployees();
mainMenu()