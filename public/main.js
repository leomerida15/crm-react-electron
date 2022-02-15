const { app, BrowserWindow } = require("electron");

const path = require("path");
const isDev = require("electron-is-dev");

const { join, resolve } = path;
// Habilite la recarga en vivo para Electron también
require("electron-reload")(__dirname, {
  // Ten en cuenta que la ruta al electrón puede variar según el archivo principal
  electron: require(join(resolve(), `/node_modules/electron`)),
});

require("@electron/remote/main").initialize();
// db
require("./Api/db/index");
require("./Api/functions");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.webContents.openDevTools();

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

const hola = () => "Hola";

module.exports = () => "Hola";
