import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const tasksFilePath = join(__dirname, "tasks.json");

function readTasks() {
  // if the json file exists then return the data in an array
  if (existsSync(tasksFilePath)) {
    const data = readFileSync(tasksFilePath, "utf8");
    return JSON.parse(data);
  }
  // else return empty array
  return []
};

function writeTasks(tasks) {
  writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf-8");
};

function addTask(description) {
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

function deleteTask(id) {
  const tasks = readTasks();

  let filteredTasks;
  for (const task of tasks) {
    if (task.id == id) {
      filteredTasks = tasks.filter((task) => task.id != id);
    }
  }

  writeTasks(refactorTasksID(filteredTasks, id));
}

function updateTask(id, description) {
  const tasks = readTasks();

  for (const task of tasks) {
    if (task.id == id) {
      task.description = description;
    }
  }

  writeTasks(tasks);
}

function markComplete(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id == id);

  if(task) {
    task.completed = true;
    if (task.inProgress) {
      task.inProgress = false;
    }
    writeTasks(tasks);
  }
  else {
    console.log("task specified not found...")
  }
}

function markInPorgress(id) {
  const tasks = readTasks();
  const task = tasks.find((task) => task.id == id);

  if (task) {
    task.inProgress = true;
    writeTasks(tasks);
  }
  else {
    console.log("task specified not found...")
  }

  writeTasks(tasks);
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


// the main function
const args = process.argv.slice(2);
if (args[0] === "add") {
  const description = args.slice(1).join(" ");
  if (description) {
    addTask(description);
  }
  else {
    console.log("no task given");
  }
}
else if (args[0] === "delete") {
  const id = args[1];
  if (id) {
    deleteTask(id);
  }
  else {
    console.log("no task specified...");
  }
}
else if (args[0] === "update") {
  const id = args[1];
  const description = args[2];
  
  if (id && description) {
    updateTask(id, description);
  }
  else {
    console.log("not enough information specified...");
  }
}
else if (args[0] === "mark-in-progress") {
  const id = args[1];

  if (id) {
    markInPorgress(id);
  }
  else {
    console.log("no task specified...");
  }
}
else if (args[0] === "mark-done") {
  const id = args[1];

  if (id) {
    markComplete(id);
  }
  else {
    console.log("no task specified...");
  }
}
else if (args[0] === "list") {
  const tasks = readTasks();

  if (tasks.length > 0) {
    listTasks(tasks);
  }
  else {
    console.log("no tasks in your list")
  }
};