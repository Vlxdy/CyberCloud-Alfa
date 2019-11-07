const { app, BrowserWindow, Menu, ipcMain, dialog , WIN} = require('electron');
const axios = require('axios')
const url = require('url');
const path = require('path');
var jsonfile = require('jsonfile');
let WindowStop;
let windowStopRun=false;
let WindowTimer;
let WindowSetting;
//functions
setInterval(consulta, 1000);

async function consulta() {
    try {
        const res = await axios.get('http://'+global.globalip+':4000/api/terminalsbeta/'+global.globalnumber);
        if (res.data.using) {
            if (windowStopRun) {
                WindowStop.hide();
                windowStopRun=!windowStopRun;
            }
            if(res.data.user.id=="0"){
                WindowTimer.webContents.send('time:anonymous',{data:res.data});
            }else{
                WindowTimer.webContents.send('time:client',{data:res.data});
            }
        }
        else{
            if (!windowStopRun) {
                WindowStop.show();
                windowStopRun=!windowStopRun;
            }
            if (WindowTimer.isMinimized()) {
                WindowTimer.restore();
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
app.on('ready', async() => {
    await configurar();
    FwindowTimer();
    FwindowStop();
});
function FwindowStop(){
        // The loocked Window
        windowStopRun=true;
        WindowStop = new BrowserWindow({
            width: 720, height: 600,
            parent: WindowTimer,
            title: 'CyberCloud-Stop',
            fullscreen: true,
            alwaysOnTop:true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        
        WindowStop.loadURL(url.format({
            pathname: path.join(__dirname, 'views/index.html'),
            protocol: 'file',
            slashes: true
        }))
        WindowStop.setMenu(null);
        // Menu
        //const mainMenu = Menu.buildFromTemplate(templateMenu);
        // Set The Menu to the Main Window
        //Menu.setApplicationMenu(mainMenu);

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

function FwindowSetting(){
    // The loocked Window
    WindowSetting = new BrowserWindow({
        width: 400, height: 300,
        title: 'CyberCloud-Setting',
        parent: WindowStop,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    WindowTimer.setMenu(null);
    WindowSetting.loadURL(url.format({
        pathname: path.join(__dirname, 'views/setting.html'),
        protocol: 'file',
        slashes: true
    }))
}
// Ipc Renderer Events
ipcMain.on('client:login', (e, clientLogin) => {
    // send to the Main Window
    axios.put(
        'http://'+global.globalip+':4000/api/signin',
        {
            email: clientLogin.email,
            password: clientLogin.password,
            terminal: global.globalnumber
        }
    ).then(response => {
        console.log(response.data)
    })
        .catch(error => {
            WindowTimer.webContents.send('login:error');
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
    //console.log(response.response);
    if (response.response==0) {
        res = await axios.delete('http://'+global.globalip+':4000/api/usedterminal/'+global.globalnumber);
        console.log(res.data)
    }
});
ipcMain.on('setting',async (e, data) => {
    try {
        res = await axios.get("http://"+data.ip+':4000/api/primary/'+data.number)
        jsonfile.writeFile('configuration.json', {ip:data.ip, number: data.number});
        app.quit();
    } catch (error) {
        console.log(error)
    }
    //console.log(data)
    //http://192.168.100.106:3000/
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
async function configurar() {
    await jsonfile.readFile('configuration.json', function (err, obj) {
        if (err){
            FwindowSetting()
        }
        else{
            //jsonfile.writeFile('configuration.json', {number: 1});
            global.globalnumber=obj.number;
            global.globalip=obj.ip;
        }
      })
}