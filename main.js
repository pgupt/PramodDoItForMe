//const { app, BrowserWindow } = require('electron')

const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
// Module with utilities for working with file and directory paths.
const path = require('path')
// Module with utilities for URL resolution and parsing.
const url = require('url')
// Module to display native system dialogs for opening and saving files, alerting, etc.
const dialog = electron.dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// Deep linked url
//let deeplinkingUrl
// Force Single Instance Application
const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    let deeplinkingUrl;
    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform == 'win32') {
        // Keep only command line / deep linked arguments
        const message = process.argv.slice(1);
        if(message) {
           deeplinkingUrl = message; //JSON.stringify(message).replace('doitforme:////', '');
        } else{
           deeplinkingUrl = "Pramod";
        }
    }
    logEverywhere(deeplinkingUrl)

    if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})
if (shouldQuit) {
    app.quit()
    return
}

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ width: 800, height: 600 })

    // and load the index.html of the app.
    //win.loadFile('index.html')

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    win.webContents.openDevTools()
    let deeplinkingUrl;
    // Protocol handler for win32
    if (process.platform == 'win32') {
        // Keep only command line / deep linked arguments
        const message = process.argv.slice(1);
        if(message) {
            deeplinkingUrl = message; //JSON.stringify(message).replace('doitforme:////', '');
            console.log(deeplinkingUrl);
        }else{
            deeplinkingUrl = "Avinash";
        }
        //deeplinkingUrl = message.replace('doitforme:////','');
        //const type = typeof (deeplinkingUrl);
        //logEverywhere(type);

    }
    logEverywhere(deeplinkingUrl)

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

// Protocol handler for osx
app.on('open-url', function (event, url) {
    event.preventDefault();
    logEverywhere("open-url event: " + url)

    //dialog.showErrorBox('open-url', `You arrived from: ${url}`)
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function logEverywhere(s) {
    console.info(s)
    if (win && win.webContents) {
        win.webContents.executeJavaScript(`alert("${s}")`);
        win.webContents.executeJavaScript(`console.info("${s}")`);
    }
}