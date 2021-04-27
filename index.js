const db = require("./db");
require("console.table");
const inquirer = require("inquirer");
const { connection } = require("./db");


console.log("My app is running")



async function viewEmployees() {
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
        db.addDepartment(department).then(res => {
            console.table(res)
        })
    })
}

async function addRole() {
    let viewDepartment = await db.viewDepartment()
    console.table(viewDepartment)

}

    inquirer
    .prompt([
        {
            name:"role",
            type: "input",
            message: "What role would you like to add?"

        }

        
    ])

viewEmployees();
mainMenu()