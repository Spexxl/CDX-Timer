const jsonfile = require ("jsonfile-promised");
const path = require('path');
const fs = require('fs');
let JsonData = [];


async function ListTaskName() {
    const DataFolder = path.join('./data');
    try {
        const files = fs.readdirSync(DataFolder);
        const jsonFiles = files.filter(file => path.extname(file) === '.json');
        JsonData = []

        for (const file of jsonFiles) {
            const filePath = path.join(DataFolder, file);
            const data = await jsonfile.readFile(filePath);
            JsonData.push(data.TaskName);
        }
    }catch (error) {console.error('Erro ao ler arquivos .json:', error);}
}

async function SyncCronometerToTask(file){
    try{
        const Cronometer = document.getElementById("Timer-container")
        const filePath = path.join("./data", file + ".json");
        const data = await jsonfile.readFile(filePath);
        const Timer = data.Timer;
        Cronometer.innerHTML = Timer
    }
    catch (error) {console.error('Erro ao ler arquivos .json:', error);}
}

function SimulateStartClick() {
    const StartButton = document.getElementById('Start-button')
    const StartImg = document.getElementById('Start-img')
    const StartClick = new MouseEvent('click',{
    view: window,
    bubbles: true,
    cancelable: true});
    console.log(StartImg.src)
    if (StartImg.src.includes('assets/Pause.png'))
    {
        StartButton.dispatchEvent(StartClick);
    }
}

function LoadExistsTasks(TaskCreateName, TaskDate, ResetButton, DeleteButton, SyncTimer) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `Task-${TaskCreateName}`;
    const innerDiv1 = document.createElement('div');
    const taskName = document.createElement('h1');
    taskName.className = `Task-Section-${TaskCreateName}`;
    taskName.textContent = TaskCreateName;
    const expanderImg = document.createElement('img');
    expanderImg.className = `Img-Expander-${TaskCreateName}`;
    expanderImg.src = './Assets/Expander.png';
    innerDiv1.appendChild(taskName);
    innerDiv1.appendChild(expanderImg);
    const section = document.createElement('section');
    const sectionDiv1 = document.createElement('div');
    const taskTimer = document.createElement('h1');
    taskTimer.className = `${TaskCreateName}-Timer`;
    taskTimer.id = `${TaskCreateName}-Timer`;
    const timerImg = document.createElement('img');
    timerImg.src = './Assets/Timer-Clock.png';
    taskTimer.appendChild(timerImg);
    taskTimer.appendChild(document.createTextNode(SyncTimer));
    const reloadLink = document.createElement('a');
    const reloadImg = document.createElement('img');
    reloadImg.src = './Assets/Reload.png';
    reloadLink.className = ResetButton;
    reloadLink.appendChild(reloadImg);
    sectionDiv1.appendChild(taskTimer);
    sectionDiv1.appendChild(reloadLink);
    const sectionDiv2 = document.createElement('div');
    const taskDate = document.createElement('h1');
    taskDate.className = `${TaskCreateName}-Date`;
    const dateImg = document.createElement('img');
    dateImg.src = './Assets/Create-date.png';
    taskDate.appendChild(dateImg);
    taskDate.appendChild(document.createTextNode(TaskDate));
    const deleteLink = document.createElement('a');
    deleteLink.className = DeleteButton;
    const deleteImg = document.createElement('img');
    deleteImg.src = './Assets/Delete.png';
    deleteLink.appendChild(deleteImg);
    sectionDiv2.appendChild(taskDate);
    sectionDiv2.appendChild(deleteLink);
    section.appendChild(sectionDiv1);
    section.appendChild(sectionDiv2);
    taskDiv.appendChild(innerDiv1);
    taskDiv.appendChild(section);
    document.getElementById('Tasks').appendChild(taskDiv);

    // Div Clicks
    const imgs = ["assets/Expander.png", "assets/Expander-Selected.png"];
    const Cronometer = document.getElementById("Timer-container");
    const CurrentTask = document.getElementById("TaskNameinTimer");
    let IsRotated = false; 

    expanderImg.addEventListener("click", function() {
        section.classList.toggle("active");
        const ExpanderActiveImg = document.querySelector(`.Img-Expander-${TaskCreateName}`)
        if (IsRotated)
        {
            ExpanderActiveImg.style.transform = 'rotate(0deg)';
        }
        else{
            ExpanderActiveImg.style.transform = 'rotate(90deg)';
        }
        IsRotated = !IsRotated;
    });

    reloadLink.addEventListener("click", async function() {
        taskTimer.lastChild.nodeValue = '00:00:00'
        if (CurrentTask.innerHTML == taskName.innerHTML)
        {
            Cronometer.innerHTML = '00:00:00';
            SimulateStartClick();
        }
        try{
            const filePath = path.join("./data", TaskCreateName + ".json");
            const data = await jsonfile.readFile(filePath);
            data.Timer = '00:00:00'
            await jsonfile.writeFile(filePath, data, { spaces: 2 });
        }
        catch{}
    });

    deleteLink.addEventListener("click", function() {
        const filePath = path.join('./data', `${TaskCreateName}.json`);
        if (CurrentTask.innerHTML == taskName.innerHTML)
            {
                CurrentTask.innerHTML = "";
                Cronometer.innerHTML = "00:00:00"
                SimulateStartClick();
            }
        try{
            taskDiv.remove();
            fs.unlinkSync(filePath);
        }
        catch{}
    });

    taskName.addEventListener("click", async function() {
        await ListTaskName();
        JsonData.forEach(items => {
            let TaskDisable = document.querySelector(`.Task-Section-${items}`);
            let TaskImgDisable = document.querySelector(`.Img-Expander-${items}`);
            TaskDisable.classList.remove('active');
            TaskImgDisable.src = imgs[0];
        });
        taskName.classList.add('active');
        expanderImg.src = imgs[1];
        const TaskNameinTimer = document.getElementById('TaskNameinTimer')
        TaskNameinTimer.textContent = TaskCreateName;
        SyncCronometerToTask(TaskCreateName)
    });
}

module.exports = {
    LoadExistsTasks,
}