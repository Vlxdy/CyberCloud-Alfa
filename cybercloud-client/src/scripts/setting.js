const { ipcRenderer } = require('electron');
const form = document.querySelector('#formsetting');
form.addEventListener('submit', e => {
    e.preventDefault();
    const ip = document.querySelector('#ip').value;
    const number = document.querySelector('#number').value;
    ipcRenderer.send('setting', {ip,number});
});