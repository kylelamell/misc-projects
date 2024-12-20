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

const args = process.argv.slice(2);

if (argv[0] == "add") {
    // add the task
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
    // list all tasks
};