// Database schema with three tables:
// department**:
//   * **id** - INT PRIMARY KEY
//   * **name** - VARCHAR(30) to hold department name

// * **role**:
//   * **id** - INT PRIMARY KEY
//   * **title** -  VARCHAR(30)
//   * **salary** -  DECIMAL
//   * **department_id** -  INT

// * **employee**:
//   * **id** - INT PRIMARY KEY
//   * **first_name** - VARCHAR(30)
//   * **last_name** - VARCHAR(30)
//   * **role_id** - INT
//   * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

// Build a command-line app
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles

// Bonus
//   * Update employee managers
//   * View employees by manager
//   * Delete departments, roles, and employees
//   * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

//SQL COnnection
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "password",
  database: "employee_trackerDb",
});

const afterConnection = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  afterConnection();
});


// Prompt Questions
const Questions = await inquirer.prompt([

[
name: "user-option"
type: 'list'
message:"What would you like to do?" 
choices: [
"View All Employees",
"View All Employees By Department",
"View All Employees By Manager",
"Add Employee",
"Remove Employee",
"Update Employee Role",
"Update Employee Manager"
]

]
)];
