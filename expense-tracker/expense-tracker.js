import { program } from "commander";

const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "expenses.json");

function getNextID(expenses) {
  const expensesCopy = expenses.map((expense) => expense);
  expensesCopy.sort((a, b) => a.id - b.id);

  let currID = 1;
  for (const expense of expensesCopy) {
    if (expense.id == currID) {
      ++currID;
    }
    else {
      break;
    }
  }
  return currID;
}

function refactorTasksID(expenses, id) {
  for (const expense of expenses) {
    if (expense.id > id) {
      --expense.id;
    }
  }
  return expenses;
}
function readExpenses() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  }
  return []
};

function writeExpenses(expenses) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(expenses, null, 2), "utf-8");
};


program
  .command("add")
  .option("-d, --description <item>", "description of item")
  .option("-a, --amount <amount>", "cost of the item")
  .action((options) => {
    const { description, amount } = options;
    const expenses = readExpenses();
    const id = getNextID(expenses);

    const expense = {
      id: id,
      date: "getdate",
      description: description,
      amount: amount
    }

    expense.push(expense);

    writeExpenses(expenses);

    console.log(`${description} costs ${amount}`);
  });
;

program
  .command("delete")
  .option("-i, --id <item>", "id of the item")
  .action((options) => {
    const { id } = options
    console.log(`deleting item with the id ${id}`);
  });
;

program
  .command("list")
  .action(() => {

  })

program.parse(process.argv);