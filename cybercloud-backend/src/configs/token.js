const express = require('express'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  app1 = express();

//app.set('llave', config.llave);
// 2
//app1.use(bodyParser.urlencoded({ extended: true }));
// 3
//app1.use(bodyParser.json());
// 4
//app.listen(3000,()=>{
//    console.log('Servidor iniciado en el puerto 3000') 
//});
// 5
//app.get('/', function(req, res) {
//    res.send('Inicio');
//});

const rutasProtegidas = express.Router();
rutasProtegidas.use((req, res, next) => {
  const token = req.body.token;
  //console.log(req.body)
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: 'Token inválida' });
      } else {
        console.log("funciono")
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: 'Token no proveída.'
    });
  }
});

module.exports = rutasProtegidas;