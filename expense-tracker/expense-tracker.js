import { program } from "commander";
import { existsSync, readFileSync, writeFileSync } from "fs";

const expensesFilePath = "./expenses.json";

// helper function for add
// gets the last id, or an id to fill in a hole if something goes awry
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

// helper funciton for delete
// refactors the list so that all id's are incremental by 1
function refactorExpensesID(expenses, id) {
  for (const expense of expenses) {
    if (expense.id > id) {
      --expense.id;
    }
  }
  return expenses;
}

// helper funciton to read in json file
function readExpenses() {
  if (existsSync(expensesFilePath)) {
    const data = readFileSync(expensesFilePath, "utf8");
    return JSON.parse(data);
  }
  return []
};

// helper funciton to wrtie to json file
function writeExpenses(expenses) {
  writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2), "utf-8");
};

// helper function for list
// pads the list so that it is formatted with a minimum amount of spaces
function calculateTableSize(expenses) {
  const maxLengths = {
    id: 3,
    date: 10,
    description: 15,
    amount: 9
  };
  for (const expense of expenses) {
    maxLengths.id = Math.max(maxLengths.id, expense.id.toString().length);
    maxLengths.date = Math.max(maxLengths.date, expense.date.length);
    maxLengths.description = Math.max(maxLengths.description, expense.description.length);
    maxLengths.amount = Math.max(maxLengths.amount, expense.amount.toString().length);
  }

  return maxLengths;
};

// add command
// takes in --description <value>
//          --amount      <value>
program
  .command("add")
  .option("-d, --description <item>", "description of item")
  .option("-a, --amount <amount>", "cost of the item")
  .action((options) => {
    const { description, amount } = options;
    const expenses = readExpenses();
    const id = getNextID(expenses);
    const date = new Date().toLocaleDateString();

    const expense = {
      id: id,
      date: date,
      description: description,
      amount: amount
    }

    expenses.push(expense);

    writeExpenses(expenses);
  });
;

// delete command
// takes in --id <value>
program
  .command("delete")
  .option("-i, --id <item>", "id of the item")
  .action((options) => {
    const { id } = options
    const expenses = readExpenses();

    let expensesFiltered;
    expenses.forEach((expense) => {
      expensesFiltered = expenses.filter((expense) => expense.id != id)
    })

    writeExpenses(refactorExpensesID(expensesFiltered, id));
  });
;

// list command
program
  .command("list")
  .action(() => {
    const expenses = readExpenses();

    const maxLengths = calculateTableSize(expenses);
    console.log(`# ${'ID'.padEnd(maxLengths.id)}  ${'Date'.padEnd(maxLengths.date)}  ${'Description'.padEnd(maxLengths.description)}  ${'Amount'.padEnd(maxLengths.amount)}`);

    for (const expense of expenses) {
      console.log(`# ${expense.id.toString().padEnd(maxLengths.id)}  ${expense.date.padEnd(maxLengths.date)}  ${expense.description.padEnd(maxLengths.description)}  ${expense.amount.toString().padEnd(maxLengths.amount)}`);
    }
  })

program.parse(process.argv);