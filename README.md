# Unit 12 MySQL Homework: Employee Tracker

I have been tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, I have built a solution for managing a company's employees using node, inquirer, and MySQL.

I am designing a database schema to contain three tables:

![Database Schema](Assets/schema.png)

- **department**:

  - **id** - INT PRIMARY KEY
  - **name** - VARCHAR(30) to hold department name

- **role**:

  - **id** - INT PRIMARY KEY
  - **title** - VARCHAR(30) to hold role title
  - **salary** - DECIMAL to hold role salary
  - **department_id** - INT to hold reference to department role belongs to

- **employee**:

  - **id** - INT PRIMARY KEY
  - **first_name** - VARCHAR(30) to hold employee first name
  - **last_name** - VARCHAR(30) to hold employee last name
  - **role_id** - INT to hold reference to role employee has
  - **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager.

Here is the deployed version of my employee tracker, for your viewing pleasure:
https://drive.google.com/file/d/1B-SJwNEGjLkPMmJU2q2npGkznn6w3vga/view

VIDEO POSTING NOT WORKING......

<iframe src="https://drive.google.com/file/d/1B-SJwNEGjLkPMmJU2q2npGkznn6w3vga/preview" width="640" height="480"></iframe>

Created by: Zana Mathuthu
Email: Zana@intercomstaffing.com
GitHub: Zanamama
LinkedIn: www.linkedin.com/in/zanamathuthu
