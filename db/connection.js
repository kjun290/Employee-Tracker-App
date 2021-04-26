const mysql = require("mysql")
const util = require("util")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Tennis290!1",
    database: "employee"
})

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;