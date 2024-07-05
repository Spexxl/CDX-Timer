const {app, BrowserWindow} = require('electron');

app.on("ready", () => {
    let mainWindow = new BrowserWindow({
        width: 1080,
        height:650,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.openDevTools(); 
});
