DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NOT NULL,
    PRIMARY KEY (id),
)

CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR (30) NOT NULL,
    salary DECIMAL,
    department_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments (id),
)

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INTEGER DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id),
)

SELECT * FROM roles;
SELECT * FROM employees;