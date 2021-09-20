const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Frogs321!",
  database: "employeeTrackerDB",
});

const mainQuestions = [
  "View Employee",
  "View Role",
  "View Department",
  "Add Employee",
  "Add Role",
  "Add Department",
  "Update Employee Role",
  "Exit!",
];

const viewTable = (table, choice) => {
  connection.query("SELECT * FROM ??", table, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
};

const addDepartment = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department you would like to add?",
      name: "name",
    },
  ]);
  connection.query(
    "INSERT INTO departments (name) VALUES (?)",
    name,
    (err, res) => {
      if (err) throw err;
      console.log(
        `\nA new Department with the name ${name} has been created?\n`
      );
      init();
    }
  );
};

const addRole = async () => {
  let { title, salary } = await inquirer.prompt([
    {
      type: "input",
      message: "What role would you like to add?",
      name: "title",
    },
    {
      type: "input",
      message: "What is the salary of this role?",
      name: "salary",
    },
  ]);
  connection.query("SELECT * FROM departments", async (err, res) => {
    if (err) throw err;
    const departmentArr = res.map(({ name }) => name);
    const { chosenDepartment } = await inquirer.prompt([
      {
        type: "list",
        message: "Which department does this rolebelgon to?",
        name: "chosenDepartment",
        choices: departmentArr,
      },
    ]);

    let depoObj;
    res.forEach((depo) => {
      if (depo.name === chosenDepartment) {
        depoObj = depo;
      }
    });

    connection.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, depoObj["id"]],
      (err, res) => {
        if (err) throw err;
        console.log(
          `Congrates! The new ${title} role has been added to the ${chosenDepartment} department.`
        );
      }
    );
    init();
  });
};

const addEmployee = async () => {
  const { first_name, last_name } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employees first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the employees last name?",
      name: "last_name",
    },
  ]);
  connection.query("SELECT * FROM roles", async (err, res) => {
    if (err) throw err;
    const roleArr = res.map(({ title }) => title);
    const { chosenRole, hasManager } = await inquirer.prompt([
      {
        type: "list",
        message: "Which role would you like to give this employee?",
        name: "chosenRole",
        choices: roleArr,
      },
      {
        type: "confirm",
        message: "Does this employee have a manager?",
        name: "hasManager",
      },
    ]);

    let roleObj;
    res.forEach((role) => {
      if (chosenRole === role.title) {
        roleObj = role;
      }
    });
    if (hasManager) {
      connection.query("SELECT * FROM employees", async (err, res) => {
        if (err) throw err;
        const employeeArr = res.map(
          ({ first_name, last_name }) => `${first_name} ${last_name}`
        );
        const { chosenManager } = await inquirer.prompt([
          {
            type: "list",
            message: "Who is this employee's manager?",
            name: "chosenManager",
            choices: employeeArr,
          },
        ]);

        let managerObj;
        res.forEach((employee) => {
          if (
            chosenManager === `${employee.first_name} ${employee.last_name}`
          ) {
            managerObj = employee;
          }
        });

        connection.query(
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
          [first_name, last_name, roleObj["id"], managerObj["id"]],
          (err, res) => {
            if (err) throw err;
            console.log(
              `Congrates! You have added ${first_name} ${last_name} as an employee.`
            );
            init();
          }
        );
      });
    } else {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)",
        [first_name, last_name, roleObj["id"]],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Congrates! You have added ${first_name} ${last_name} as an employee.`
          );
          init();
        }
      );
    }
  });
};

const updateEmployeeRole = () => {
  connection.query("SELECT * FROM employees", async (err, res) => {
    if (err) throw err;
    const employeeArr = res.map(
      ({ first_name, last_name }) => `${first_name} ${last_name}`
    );
    const { chosenEmployee } = await inquirer.prompt([
      {
        type: "list",
        message: "Which employee's role would you like to change?",
        name: "chosenEmployee",
        choices: employeeArr,
      },
    ]);

    let employeeObj;
    res.forEach((employee) => {
      if (chosenEmployee === `${employee.first_name} ${employee.last_name}`) {
        employeeObj = employee;
      }
    });
    connection.query("SELECT * FROM roles", async (err, res) => {
      if (err) throw err;
      const roleArr = res.map(({ title }) => title);
      const { chosenRole } = await inquirer.prompt([
        {
          type: "list",
          message: `Which role do you wish to give ${chosenEmployee}`,
          name: "chosenRole",
          choices: roleArr,
        },
      ]);

      console.log(chosenRole);

      let roleObj;
      res.forEach((role) => {
        if (chosenRole === role.title) {
          roleObj = role;
        }
      });
      console.log(roleObj);
      console.log(employeeObj);
      connection.query(
        "UPDATE employees SET ? WHERE ?",
        [{ role_id: roleObj["id"] }, { id: employeeObj["id"] }],
        (err, res) => {
          if (err) throw err;
          console.log(
            `Congrats! You have changes ${chosenEmployee}'s role to ${chosenRole}`
          );
          init();
        }
      );
    });
  });
};

const init = async () => {
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: mainQuestions,
    },
  ]);
  switch (userChoice) {
    case "Add Employee":
      addEmployee();
      break;
    case "Add Role":
      addRole();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "View Employee":
      viewTable("employees");
      break;
    case "View Role":
      viewTable("roles");
      break;
    case "View Department":
      viewTable("departments");
      break;
    case "Update Employee Role":
      updateEmployeeRole();
      break;
    case "Exit!":
      connection.end();
  }
};

connection.connect((err) => {
  if (err) throw err;
  console.log("connect");
  init();
});
