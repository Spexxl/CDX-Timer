const moment = require("moment");
const fs = require("fs");
const TaskManager = require("./TaskManager");


module.exports = {
    
    async CreateNewTask(TaskCreateName){

        const TasksContainer = document.getElementById('Tasks')
        const TaskExistsName = `./data/${TaskCreateName}.json`;
        if (fs.existsSync(TaskExistsName)) {
            console.log("Task already exists");
            return;
        }
        const DataTask = {
            TaskName: TaskCreateName,
            Timer: "00:00:00",
            CreateData: moment().format('DD/MM/YYYY'),
            ResetButton: `${TaskCreateName}-Reload`,
            DeleteButton: `${TaskCreateName}-Delete`
        };
        await TaskManager.Write(TaskExistsName, DataTask);
        await this.removeAllChildren(TasksContainer)
        TaskManager.TaskList();
    },

    async removeAllChildren(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

}