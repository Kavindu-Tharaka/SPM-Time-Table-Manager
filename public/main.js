const electron = require("electron");
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    x: 200,
    y: 100,
    width: 1280,
    height: 720,
    resizable: false,
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // Open devtools if dev
    if (isDev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require("electron-devtools-installer");

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log("Error loading React DevTools: ", err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.setMenuBarVisibility(false);
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add new Item",
        click() {
          createAddWindow();
        },
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Developer Tools",

    submenu: [
      {
        label: "Toggle Dev tools",
        accelerator: process.platform == "darwin" ? "Command + I" : "Ctrl + I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      { role: "reload" },
    ],
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
