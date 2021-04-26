const connection = require('./connection');

class DB {
    constructor(connection){
        this.connection = connection
    }

    selectAllEmployees() {
        return this.connection.query(
        "SELECT * from employee"
        )
    };

    addDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?", department
        )
    };

    addRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", role
        )
    };

    addEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", employee
        )
    };

    viewDepartment() {
        return this.connection.query(
            "SELECT * FROM department"
        )
    };

    viewRoles() {
        return this.connection.query(
            "SELECT * FROM roles"
        )
    };
    
    viewEmployee() {
        return this.connection.query(
            "SELECT * FROM employee"
        )
    };

}

module.exports = new DB(connection)

