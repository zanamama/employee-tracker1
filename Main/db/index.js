// DEPENDENCIES
//mysql
const mysql = require("mysql");
// inquirer
const inquirer = require("inquirer");

//mysql config
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Frogs321!",
});

//STARTING DATA
//question sets

const startQuestions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: ["proceed", "create new employee", "Exit"],
  },
  {
    type: "list",
    message: "What would you like to do?",
    name: "userChoice",
    choices: ["proceed", "create new employee", "Exit"],
  },
];

const deptQuestions = [
  {
    type: "input",
    message: "what would you like to say about yourself?",
    name: item,
  },
];
//FUNCTIONS
// start - runs the questions

const start = async () => {
  console.log("Tell me you're working.");
  const { userChoice } = await inquirer.prompt(startQuestions);
  switch (userChoice) {
    case "POST":
    return newEmployee();
      case "POST":
      return newEmployee();
    case "EXIT":
      connection.end();
  }
};
// createAuction -create new action
const createNewEmployee = async () => {
  console.log("We're creating an auction");
  const { id, name, title } = connection.query(
    "INSERT INTO employeeTracker SET ?",
    {
      item: item,
      name: name,
      title: title,
    },
    (err, res) => {
      if (err) throw err;
    }
  );
};

const nextEmployee = () => {
  console.log("new person ready?");
};
// - prompt user

//INITIALIZATION run start method
connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected at ${connection.threadId}`);
  start();
});
