// Modules to control application life and create native browser window
const electron = require('electron');
const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');

const path = require('path');
const isDev = require('./package.json').isDev;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 650,
    autoHideMenuBar: true,
    resizable: false,
    show: false,
    frame: false
  });

  // IPC section ------------------------------------------------

  // --------------------------------------------------------------
  // and load the index.html of the app.

  isDev
    ? mainWindow.loadURL('http://localhost:3000/')
    : mainWindow.loadFile(path.join(__dirname, './build/index.html'));

  // Open the DevTools.
  isDev && mainWindow.webContents.openDevTools({ mode: 'detach' });

  mainWindow.on('blur', function() {
    //mainWindow.hide();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let appIcon = null;

app.on('ready', () => {
  createWindow();

  // Create Screen sizes for window placement
  const mainScreen = electron.screen.getPrimaryDisplay().workAreaSize;
  const winSize = mainWindow.getContentSize();
  const { width } = mainScreen;

  // Place window in top left of main screen
  mainWindow.setPosition(width - winSize[0], 0);

  // Minimize window when focus is lost
  // mainWindow.on('blur', () => {
  //   mainWindow.hide()
  // })

  appIcon = new Tray(path.join(__dirname, 'rgb-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Close',
      click() {
        mainWindow.close();
      }
    },
    {
      label: 'Open',
      click() {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
      }
    }
  ]);

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu);

  // Make the window open and close when icon is clicked
  appIcon.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  // Install React Dev Tools Extension
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer');

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension:  ${name}`))
      .catch(err => console.log('An error occurred: ', err));
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
