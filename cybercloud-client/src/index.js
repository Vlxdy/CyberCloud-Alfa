const { app, BrowserWindow, Menu, ipcMain, dialog , WIN} = require('electron');
const axios = require('axios')
const url = require('url');
const path = require('path');
const fs = require('fs')
const { configurar } = require('./scripts/information')
let WindowStop;
let windowStopRun=false;
let WindowTimer;
//functions
setInterval(consulta, 1000);
configurar();

async function consulta() {
    try {
        const res = await axios.get('http://localhost:4000/api/terminals/'+global.globalnumber);
        if (res.data.using) {
            if (windowStopRun) {
                WindowStop.hide();
                windowStopRun=!windowStopRun;
            }
            WindowTimer.webContents.send('time:client',{data:res.data});
            // pc ocupada
        }
        else{
            if (!windowStopRun) {
                WindowStop.show();
                windowStopRun=!windowStopRun;
            }
            // terminal desocupada
        }
    } catch (error) {
        console.log(error)
    }
}

// Reload in Development for Browser Windows
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}
app.on('ready', () => {
    FwindowTimer();
    FwindowStop();
});
function FwindowStop(){
        // The loocked Window
        windowStopRun=true;
        WindowStop = new BrowserWindow({
            width: 720, height: 600, fullscreen: true,parent: WindowTimer,
            alwaysOnTop:true,
            title: 'CyberCloud-Stop',
            webPreferences: {
                nodeIntegration: true
            }
        });
    
        WindowStop.loadURL(url.format({
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true
        }))
        // Menu
        const mainMenu = Menu.buildFromTemplate(templateMenu);
        // Set The Menu to the Main Window
        Menu.setApplicationMenu(mainMenu);
    
        // If we close main Window the App quit
        WindowStop.on('closed', () => {
            app.quit();
        });    
}

function FwindowTimer() {
    WindowTimer = new BrowserWindow({
        thickFram: false,
        x:0,
        y:0,
        width: 150,
        height: 180,
        title: 'CyberCloud',
        movable:false,
        frame: false,
        titleBarStyle: 'customButtonsOnHover',
        transparent:true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    WindowTimer.setMenu(null);
    WindowTimer.loadURL(url.format({
        pathname: path.join(__dirname, 'views/timer.html'),
        protocol: 'file',
        slashes: true
    }));
    WindowTimer.on('closed', () => {
        WindowTimer = null;
    });
}

// Ipc Renderer Events
ipcMain.on('client:login', (e, clientLogin) => {
    // send to the Main Window
    axios.put(
        'http://localhost:4000/api/signin',
        {
            email: clientLogin.email,
            password: clientLogin.password,
            terminal: global.globalnumber
        }
    ).then(response => {
        console.log(response.data)
    })
        .catch(error => {
            mainWindow.webContents.send('login:error');
            console.log(error.response.data)
        });
    //mainWindow.webContents.send('product:new', newProduct);
    //newProductWindow.close();
});
ipcMain.on('client:terminar',async (e) => {
    let options  = {
        buttons: ["Si","No"],
        message: "¿Está seguro que desea terminar la sesión?"
       }
    let response = await dialog.showMessageBox(WIN,options)   

});


// Menu Template
const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// if you are in Mac, just add the Name of the App
if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: app.getName(),
    });
};

// Developer Tools in Development Environment
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })

}
//setInterval(()=>console.log(global.globalnumber),2000)