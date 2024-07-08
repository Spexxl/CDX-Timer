const {app, BrowserWindow, ipcMain} = require('electron');

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1080,
        height: 650,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);
ipcMain.on('maximize-window', (event) => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});
ipcMain.on('minimize-window', (event) => {
    mainWindow.minimize();
});
ipcMain.on('close-window', (event) => {
    app.quit();
});