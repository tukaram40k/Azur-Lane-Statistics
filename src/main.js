const { app, BrowserWindow } = require('electron')
const { spawn } = require('child_process')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('./renderer/html/index.html')
}

app.whenReady().then(() => {
    createWindow()
})