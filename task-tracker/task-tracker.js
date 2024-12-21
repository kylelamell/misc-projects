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
    if (task.id == currID) {
      ++currID;
    }
    else {
      break;
    }
  }
  return currID;
}

function refactorTasksID(tasks, id) {
  for (const task of tasks) {
    if (task.id > id) {
      --task.id;
    }
  }
  return tasks;
}

function listTasks(tasks) {
  for (const task of tasks) {
    console.log("task id: " + task.id);
    console.log("task description: " + task.description);
    console.log("completed: " + task.completed);
    console.log("in progress: " + task.inProgress);
    console.log("");
  }
}

const args = process.argv.slice(2);

if (args[0] === "add") {
  const description = args.slice(1).join(" ");
  if (description) {
    const tasks = readTasks();

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
  else {
    console.log("no description given...");
  }
}
else if (args[0] === "delete") {
  const id = args[1];
  if (id) {
    const tasks = readTasks();
    let filteredTasks;
    for (const task of tasks) {
      if (task.id == id) {
        filteredTasks = tasks.filter((task) => task.id != id);
      }
    }
    const refactoredTasks = refactorTasksID(filteredTasks, id);
    writeTasks(refactoredTasks);
  }
  else {
    console.log("no task specified");
  }
}
else if (args[0] === "update") {
  // update task description
}
else if (args[0] === "mark-in-progress") {
  // mark taks in progress
}
else if (args[0] === "mark-done") {
  // mark  task done
}
else if (args[0] === "list") {
  const tasks = readTasks();
  listTasks(tasks);
};