const timer = require("./timer");
const tasks = require("./TaskCreate");
const LoadTasks = require("./TaskManager");
const { ipcRenderer } = require('electron');
const TaskManager = require("./TaskManager");

let ImgsButton = document.querySelector(".Start-img");
let StartButton = document.querySelector(".Start-button");
let TimerContainer = document.getElementById("Timer-container");
let AddTaskButton = document.querySelector(".AddTaskButton");
let AddTaskName = document.querySelector(".EnterTaskCreate");
let CurrentTask = document.getElementById("TaskNameinTimer")
let imgs = ["assets/Start.png", "assets/Pause.png"];
let isRunning = false;

document.querySelector('.Expander').addEventListener('click', () => {
    ipcRenderer.send('maximize-window');
});

document.querySelector('.Minimize').addEventListener('click', () => {
    ipcRenderer.send('minimize-window');
});

document.querySelector('.Closer').addEventListener('click', () => {
    if (isRunning) {
        timer.stop();
        TaskManager.SaveTimer(CurrentTask.innerHTML);
    }
    ipcRenderer.send('close-window');
});

StartButton.addEventListener("click", function () {
    if (isRunning) {
        ImgsButton.src = imgs[0]; 
        timer.stop();
        TaskManager.SaveTimer(CurrentTask.innerHTML);
    } else {
        ImgsButton.src = imgs[1]; 
        timer.start(TimerContainer);   
    }
    isRunning = !isRunning;
});

AddTaskButton.addEventListener("click", function(){
    if (AddTaskName.value != "")
        {
            tasks.CreateNewTask(AddTaskName.value);
            AddTaskName.value = "";
        }
});

document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.querySelector(".EnterTaskCreate");

    taskInput.addEventListener("input", function() {
        this.value = this.value.replace(/\s+/g, '-');
    });
});

LoadTasks.TaskList();
