INSERT INTO departments (name) 
VALUES ("Marketing"), ("Accounting"), ("Finance"), ("Engineering"), ("Legal");

SELECT * FROM departments;

INSERT INTO roles (title, salary, department_id) 
VALUES ("Accoutant", 90000, 2), ("Head of Marketing", 90000, 1), ("Fin. Analyst", 105000, 3), ("Junior Dev.", 80000, 4), ("Senior Dev.", 135000, 4), ("Lawyer", 150000, 5);

SELECT * FROM roles;

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Frank", "Halman", 1, NULL), ("Wendy", "Jones", 2, NULL), ("Tiffany", "Fields", 3, NULL), ("Gerard", "Jones", 5, NULL), ("Michelle", "Overly", 4, 4), ("Steve", "Johnson", 5, NULL);

SELECT * FROM employees;