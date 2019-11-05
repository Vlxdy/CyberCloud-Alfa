const { ipcRenderer, dialog } = require('electron');
ipcRenderer.on('time:anonymous', e => {
    var current = document.getElementById("timer");
    current.innerHTML = alertTemplate;
});
ipcRenderer.on('time:client', (e, msj) => {
    let seconds = ("0" + (Math.floor(msj.data.times / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(msj.data.times / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(msj.data.times / 3600000)).slice(-2);
    let price = msj.data.costTerminal+msj.data.costItem;
    alertTemplate=`
    <h2 class="text-white">`+hours+`:`+minutes+`:`+seconds+`</h2>
    <h2 class="text-white">`+price+` Bs</h2>
    <h4 class="text-white">`+msj.data.user.name+`</h4>
    `
    ;
    var current = document.getElementById("timer");
    current.innerHTML = alertTemplate;
    console.log(msj)
});
function terminar(){
    ipcRenderer.send('client:terminar');
}