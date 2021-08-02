// Database schema with three tables:
// department**:
//   * **id** _ INT PRIMARY KEY
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

//List of dependencies
console.log("starting");
const inquirer = require("inquirer");
console.log("inquirer");
const mysql = require("mysql");
console.log("mysql");
require("console.table");
console.log("This is line 34");

//SQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_trackerDb",
});
console.log("This is line 44");

//Connection to SQL Db
connection.connect((err) => {
  if (err) throw err;
  console.log(
    `Employee Tracker Database is connected as id ${connection.threadId}\n`
  );
  mainQuestions();
});

// Prompt Questions
const mainQuestions = async () => {
  try {
    const questions = await inquirer.prompt([
      {
        name: "user_option",
        type: "list",
        message: "Select what would you like to do",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Department",
          "View Role",
          "View Employees",
          "Update Employee Role",
          "Exit",
        ],
      },
    ]);
    selections(questions.user_option);
  } catch (error) {
    console.log(error);
  }
};

// if block for main questions
const selections = (user_option) => {
  if (user_option === "Add Department") {
    employeeDept();
  }
  if (user_option === "Add Role") {
    employeeRole();
  }
  if (user_option === "Add Employees") {
    employeeAdd();
  }
  if (user_option === "View Department") {
    viewDept();
  }
  if (user_option === "View Role") {
    viewRole();
  }
  if (user_option === "View Employees") {
    viewAll();
  }
  if (user_option === "Update Employee Role") {
    updateRole();
  }
  if (userChoice === "Exit?") {
    console.log("Thank you for updating the Employee Tracker");
    connection.end();
  }
};

// Add Department
const employeeDept = async () => {
  try {
    const newDept = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ]);
    connection.query("INSERT INTO departments(name) VALUES(?)", newDept.name);
    console.log(`New department added: ${newDept.name}`);
    start();
  } catch (err) {
    console.log(err);
    connection.end();
  }
};
// Add Role
const employeeRole = async () => {
  try {
    const { title, salary, department } = await inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "number",
        message: "What is the salary for the new role?",
      },
      // Key pairs for role ids
      {
        name: "department",
        type: "list",
        message: "Select the department for the employee",
        choices: [
          { name: "Engineer", value: 1 },
          { name: "Sales", value: 2 },
          { name: "IT", value: 3 },
          { name: "Legal", value: 4 },
        ],
      },
    ]);
    const query = "INSERT INTO role SET ?";
    connection.query(
      query,
      { title, salary, department_id: department },
      (err, title) => {
        console.log(`NEW ROLE ADDED:${title}`);
        start();
      }
    );
  } catch (err) {
    console.log(err);
    connection.end();
  }
};
// Add Employee
const employeeAdd = async () => {
  try {
    const { first, last, role, manager } = await inquirer.prompt([
      {
        name: "first",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last",
        type: "input",
        message: "What is the employee's last name?",
      },
      // Key pairs for role ids
      {
        name: "role",
        type: "list",
        message: "Select the employee's role",
        choices: [
          { name: "Lead Engineer", value: 1 },
          { name: "Mid Engineer", value: 1 },
          { name: "Entry Engineer", value: 1 },
          { name: "Lead Sales", value: 2 },
          { name: "Mid Sales", value: 2 },
          { name: "Entry Sales", value: 2 },
          { name: "IT Lead", value: 3 },
          { name: "IT Manager", value: 3 },
          { name: "Lawyer Legal", value: 4 },
        ],
      },
      // Key pairs for manager ids
      {
        name: "manager",
        type: "list",
        message: "Select the employee's manager",
        choices: [
          { name: "Paul Blart", value: 1 },
          { name: "Mary Allen", value: 2 },
          { name: "Francis Eddy", value: 3 },
          { name: "None", value: null },
        ],
      },
    ]);
    const query =
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)";
    connection.query(query, [first, last, role, manager], (err, result) => {
      if (err) throw err;
      console.log(`NEW EMPLOYEE ADDED:${first} ${last} `);
      start();
    });
  } catch (err) {
    console.log(err);
    connection.end();
  }
};
// View Department
const viewDept = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, department) => {
    if (err) throw err;
    console.table(department);
    mainQuestions();
  });
};
// View Role
const viewRole = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, role) => {
    if (err) throw err;
    console.table(role);
    mainQuestions();
  });
};
// View Employees
const viewAll = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, employee) => {
    if (err) throw err;
    console.table(employee);
    mainQuestions();
  });
};
// Update Employee Role
const updateRole = async () => {
  connection.query("SELECT last_name from employees", async (err, res) => {
    try {
      const { last_name } = await inquirer.prompt([
        {
          name: "last_name",
          type: "list",
          message:
            "Select the last name of the employee you want to update/change for the role ID",
          choices: res.map(({ last_name }) => last_name),
        },
      ]);

      const { role_id } = await inquirer.prompt([
        {
          name: "role_id",
          type: "list",
          message: "Select the updated employee's role",
          choices: [
            { name: "Lead Engineer", value: 1 },
            { name: "Mid Engineer", value: 1 },
            { name: "Entry Engineer", value: 1 },
            { name: "Lead Sales", value: 2 },
            { name: "Mid Sales", value: 2 },
            { name: "Entry Sales", value: 2 },
            { name: "IT Lead", value: 3 },
            { name: "IT Manager", value: 3 },
            { name: "Legal", value: 4 },
          ],
        },
      ]);

      const query = "UPDATE employees SET role_id =? WHERE last_name =?";
      connection.query(query, [parseInt(role_id), last_name], (err, res) => {
        if (err) throw err;
        console.log(`${last_name} updated Role ID to: ${role_id}`);
      });
      start();
    } catch (error) {
      console.log(error);
      connection.end();
    }
  });
};
