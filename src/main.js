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

// analyze the stats
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
            return fs.readFileSync(filePath, 'utf8');
        } catch (err) {
            return `Error reading file: ${err.message}`;
        }
    });

    // show files from working directory
    ipcMain.handle('list-files', async () => {
        try {
            const files = fs.readdirSync('./resources/stats');
            return files;
        } catch (err) {
            return [];
        }
    });

    // append a new entry to the stats
    ipcMain.handle('append-to-file', async (event, fileName, content) => {
        try {
            const filePath = path.join('resources', 'stats', fileName);
            fs.appendFileSync(filePath, `\n${content}`);
            return 'Success';
        } catch (err) {
            return `Error: ${err.message}`;
        }
    });

    createMainWindow()
})