const fs = require("fs");
const path = require("path");

const tasksFilePath = path.join(__dirname, "tasks.json");

function readTasks() {
  // if the json file exists then return the data in an array
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  }
  // else return empty array
  return []
};

function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

function addTask(task, tasks) {
  return 0;
}

function deleteTask(task, tasks) {
  return 0;
}

function updateTask(task, description) {
  return 0;
}

function markComplete(task) {
  return 0;
}

function markInPorgress(task) {
  return 0;
}

function markTasks() {
  return 0;
}

function getNextID(tasks) {
  const taskCopy = tasks.map((task) => task);
  taskCopy.sort((a, b) => a.id - b.id);

  let currID = 1;
  for (const task of taskCopy) {
    if (task.id !== currID) {
      return currID;
    }
    else {
      currID++;
    }
    return currID;
  }

}

function listTasks(tasks) {
  for (const task of tasks) {
    console.log(task.id);
    console.log(task.description);
    console.log(task.completed);
    console.log(task.inProgress);
    console.log("\n");
  }
}

const args = process.argv.slice(2);

if (argv[0] == "add") {
  if (argv[1]) {
    const tasks = readTasks();

    const description = argv[1];
    const id = getNextID(tasks);

    const task = {
      id: id,
      description: description,
      completed: false,
      inProgress: false
    }

    tasks.push(task);

    writeTasks(tasks);
  }
}
else if (argv[0] == "delete") {
  // delete the task
}
else if (argv[0] == "update") {
  // update task description
}
else if (argv[0] == "mark-in-progress") {
  // mark taks in progress
}
else if (argv[0] == "mark-done") {
  // mark  task done
}
else if (argv[0] == "list") {
  const tasks = readTasks();
  listTasks(tasks);
};