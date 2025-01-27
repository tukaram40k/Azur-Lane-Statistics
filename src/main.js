const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { spawn } = require('child_process')
const fs = require('fs');

const createMainWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./renderer/html/index.html')
}

const launchPythonScript = () => {
    const pythonScript = './src/main.py'
    const statsDir = './resources/stats'
    const outputDir = './resources/output'

    spawn('python', [pythonScript, statsDir, outputDir])
    console.log('script launched')
}

app.whenReady().then(() => {
    ipcMain.on('launch-python-script', launchPythonScript)

    ipcMain.handle('read-file', async (event, filePath) => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            return data;
        } catch (err) {
            return `Error reading file: ${err.message}`;
        }
    });

    createMainWindow()
})