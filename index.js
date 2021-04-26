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
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do",
        choices: ["add a department", "add a role", "add an employee", "view departments", "view roles", "view an employee", "update employee's role", "exit"
        ]
    })

    .then((choice) => {
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
viewEmployees();
mainMenu()