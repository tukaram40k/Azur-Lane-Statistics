const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    launchPythonScript: () => ipcRenderer.send('launch-python-script'),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    listFiles: () => ipcRenderer.invoke('list-files'),
    appendToFile: (fileName, content) => ipcRenderer.invoke('append-to-file', fileName, content),
})