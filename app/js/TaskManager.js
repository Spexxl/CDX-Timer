const Taskload = require ("./TaskLoad")
const jsonfile = require ("jsonfile-promised");
const path = require('path');
const fs = require('fs');

module.exports = {
    Write(TaskCreateName, DataTask){
        jsonfile.writeFile(TaskCreateName, DataTask, { spaces: 2})
    },

    async TaskList(){
        const DataFolder = path.join('./data');
        try {
            const files = fs.readdirSync(DataFolder);
            const jsonFiles = files.filter(file => path.extname(file) === '.json');

            for (const file of jsonFiles) {
                const filePath = path.join(DataFolder, file);
                const data = await jsonfile.readFile(filePath);
                const JsonData = [data.TaskName, data.CreateData, data.ResetButton, data.DeleteButton, data.Timer]
                Taskload.LoadExistsTasks(JsonData[0],JsonData[1],JsonData[2],JsonData[3],JsonData[4]);
            }
        } catch (error) {console.error('Erro ao ler arquivos .json:', error);}
    },

    async ListTaskName(){
        const DataFolder = path.join('./data');
        let JsonData = [];
        try {
            const files = fs.readdirSync(DataFolder);
            const jsonFiles = files.filter(file => path.extname(file) === '.json');
            
            for (const file of jsonFiles) {
                const filePath = path.join(DataFolder, file);
                const data = await jsonfile.readFile(filePath);
                JsonData.push({TaskName: data.TaskName}) 
            }
        } catch{}
    },

    async SaveTimer (TaskName){
        const TaskTimer = document.getElementById(`${TaskName}-Timer`);
        const CronometerTimer = document.getElementById('Timer-container')
        TaskTimer.lastChild.nodeValue = CronometerTimer.innerHTML;

        try{
            const filePath = path.join("./data", TaskName + ".json");
            const data = await jsonfile.readFile(filePath);
            data.Timer = CronometerTimer.innerHTML
            await jsonfile.writeFile(filePath, data, { spaces: 2 });
        }
        catch{}
    }  
}