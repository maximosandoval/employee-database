DROP DATABASE IF EXISTS employee_trackerDb; 

CREATE DATABASE employee_trackerDb;

USE employee_trackerDb;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
  
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL, 
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT null,
  PRIMARY KEY (id)
  FOREIGN KEY (manager_id) REFERENCES employee (id)
  FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO department (name) VALUES
(`Engineer`)
(`Sales`)
(`IT`)
(`Legal`)

INSERT INTO role (title, salary, department_id) VALUES
(`Lead Engineer`, 50000, 1)
(`Mid Engineer`, 40000, 1)
(`Entry Engineer`, 30000, 1)
(`Lead Sales`, 150000, 2)
(`Mid Sales `, 50000, 2)
(`Entry Sales `, 40000, 2)
(`IT Lead`, 100000, 3)
(`IT Manager`, 80000, 3)
(`Lawyer egal`, 25000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
(`Paul`, `Blart`, 1, NULL)
(`Kevin`, 'Smith', 2, 1)
(`Keith`, 'Thequeef', 3, 1)
(`Mary`, `Allen`, 4, 2)
(`Humpty`, `Dump`, 5, 2)
(`Engelbert`, `Ding`, 6, 2)
(`Francis`, `Eddy`, 7, 3)
(`Carmel`, `Simple`, 8, 3)
(`Kandy`, `Mullins`, 9, 4)