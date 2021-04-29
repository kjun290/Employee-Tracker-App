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
    mainMenu()
}

const mainMenu = () => {
    inquirer
    .prompt({
        name: "choice",
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
        switch (answer.choice) {
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
        let department = {
            departmentName: answer.addDepartment
        }
        DB.addDepartment(department).then(Response => {
            console.table(Response)
            viewDepartment()
        })
    })
};

const addRole = async () => {
    let viewDepartment = await db.addRole();
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
        let role = {
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
    let role = await DB.viewRoles();
    let allRoles = role.map(({title, id}) => ({name:title, value: id}))
};
    let employees = await DB.viewEmployees();
    console.log (employees);
    const managers = employees.map(({first_name, last_name, id}) => ({
        name: first_name + last_name,
        value: id 
    }))

    inquirer
    .prompt([
       {
           name: "first_name",
           type: "input",
           message: "What is the first name?"
       },

       {
           name: "last_name",
           type: "input",
           message: "what is the last name"
       },

       {
           name: "role_id",
           type: "rawlist",
           message: "what role is the role",
           choices: allRoles
       },

       {
           name: "manager_id",
           type: "rawlist",
           message: "who is the manager",
           choices: managers
       },


    ])

    .then(answer => {
        console.log(answer)
        let newEmployee = {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            managers_id: answer.managers_id
        }

        DB.addEmployee(newEmployee).then(response => {
            console.table(response)
            viewEmployees
        })
    }) 

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