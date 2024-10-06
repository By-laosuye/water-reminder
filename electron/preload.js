// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 暴露ipcRenderer给渲染进程
contextBridge.exposeInMainWorld('electron', {
  sendNotification: (title, body) => ipcRenderer.send('notify', { title, body }),
  checkFile: (filePath) => ipcRenderer.invoke('check-file', filePath),
});
