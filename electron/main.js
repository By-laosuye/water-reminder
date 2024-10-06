// electron/main.js
const { app, BrowserWindow, Menu, screen, Notification, ipcMain } = require("electron");
const path = require("path");

// 是否是生产环境
const isPackaged = app.isPackaged;

// 禁止显示默认菜单
Menu.setApplicationMenu(null);

// 主窗口
let mainWindow;

// 创建浏览器窗口
const createWindow = () => {
  mainWindow = new BrowserWindow({
    title: "Electron + Vue3",
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    icon: path.resolve(__dirname, "../build/icon.ico"),
    webPreferences: {
      contextIsolation: true // 启用上下文隔离
    },
  });

  // 开发环境下，打开开发者工具。
  if (!isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // 使用 loadURL 加载 http://localhost:3040
  mainWindow.loadURL("http://localhost:3040/");
};


// 在应用准备就绪时调用函数
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// 如果开发环境使用了 nginx 代理，禁止证书报错
if (!isPackaged) {
  app.on("certificate-error", (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
  });
};
