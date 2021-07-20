# employee-database

# employee-database

Database schema with three tables:
department\*\*:

- **id** - INT PRIMARY KEY
- **name** - VARCHAR(30) to hold department name

- **role**:

  - **id** - INT PRIMARY KEY
  - **title** - VARCHAR(30)
  - **salary** - DECIMAL
  - **department_id** - INT

- **employee**:
  - **id** - INT PRIMARY KEY
  - **first_name** - VARCHAR(30)
  - **last_name** - VARCHAR(30)
  - **role_id** - INT
  - **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager

Build a command-line app

- Add departments, roles, employees
- View departments, roles, employees
- Update employee roles

Bonus

- Update employee managers
- View employees by manager
- Delete departments, roles, and employees
- View the total utilized budget of a department -- ie the combined salaries of all employees in that department
