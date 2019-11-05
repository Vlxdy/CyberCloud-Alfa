var jsonfile = require('jsonfile');
const { ipcRenderer } = require('electron');
let number = 0;
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const emailClient = document.querySelector('#email').value;
    const passwordClient = document.querySelector('#password').value;
    const newLogin = {
        email: emailClient,
        password: passwordClient
    };
    ipcRenderer.send('client:login', newLogin);
    //iniciarSession();
});

ipcRenderer.on('login:error', e => {
    var current = document.getElementById("alert");
    current.innerHTML = alertTemplate;
});
ipcRenderer.on('login:credit', e => {
    var current = document.getElementById("alert");
    current.innerHTML = saldoTemplate;
});

function assignanumero() {
    jsonfile.readFile('configuration.json', function (err, obj) {
        if (err == null) {
            number = obj.number;
        }
        else {
            console.log(err)
        }
    });
}

assignanumero();
setTimeout(() => terminalnumber(), 500);

function terminalnumber() {
    // crea un nuevo div 
    // y añade contenido 
    const numberTemplate =
        `<div class="card"><h1 class="text-center display-1 font-weight-bold">` + number +
        `</h1></div>`;
    console.log(numberTemplate)
    var currentDiv = document.getElementById("number");
    //document.body.insertBefore(newDiv, currentDiv);
    currentDiv.innerHTML = numberTemplate;
}
// New Product
function iniciarSession() {
    var current = document.getElementById("alert");
    current.innerHTML = alertTemplate;
    //document.body.innerHTML = loginTemplate;
}

const newProductTemplate = `
    <form class="p-4">
      <div class="form-group">
        <input type="text" id="name" class="form-control" placeholder="Product's Name" autofocus>
      </div>
      <div class="form-group">
        <input type="text" id="price" class="form-control" placeholder="Price">
      </div>
      <div class="form-group">
        <input type="text" id="description" class="form-control" placeholder="Description">
      </div>
      <button class="btn btn-primary btn-block">
        Save
      </button>
    </form>
    `;
const loginTemplate = `
<div class="row justify-content-center align-self-center">
<div class="col m-4">
</div>
<div class="col m-4">
<div class="card body">
<form>
<div class="form-group">
  <label for="exampleInputEmail1">Email address</label>
  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
</div>
<div class="form-group form-check">
  <input type="checkbox" class="form-check-input" id="exampleCheck1">
  <label class="form-check-label" for="exampleCheck1">Check me out</label>
</div>
<button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
</div>
<div class="col m-4">
</div>
</div>
`;    
const alertTemplate =`<div class="alert alert-danger alert-dismissible fade show">
El usuario o contraseña es incorrecto.
</div>`
const saldoTemplate =`<div class="alert alert-warning alert-dismissible fade show">
Credito insuficiente.
</div>`