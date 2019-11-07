const { ipcRenderer } = require('electron');
ipcRenderer.on('time:anonymous', (e, msj) => {
    let seconds = ("0" + (Math.floor(msj.data.time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(msj.data.time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(msj.data.time / 3600000)).slice(-2);
    let price = msj.data.price+msj.data.costItem;
    alertTemplate=`
    <h3 class="">`+hours+`:`+minutes+`:`+seconds+`</h3>
    <h5 class="">Costo: `+price+` Bs</h5>
    <h4 class="">`+msj.data.user.name+`</h4>`;
    var current = document.getElementById("timer");
    current.innerHTML = alertTemplate;
});
ipcRenderer.on('time:client', (e, msj) => {
    let seconds = ("0" + (Math.floor(msj.data.time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(msj.data.time / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(msj.data.time / 3600000)).slice(-2);
    alertTemplate=`
    <h3 class="">`+hours+`:`+minutes+`:`+seconds+`</h3>
    <h5 class="">Credito: `+msj.data.user.money+` Bs</h5>
    <h4 class="">`+msj.data.user.name+`</h4>`;
    var current = document.getElementById("timer");
    current.innerHTML = alertTemplate;
    console.log(msj)
});
function terminar(){
    ipcRenderer.send('client:terminar');
}