const fs = require('fs');
var jsonfile = require('jsonfile');
const axios = require('axios');
async function configurar() {
    await jsonfile.readFile('configuration.json', function (err, obj) {
        if (err==null){
            global.globalnumber=obj.number;
        }
        else{
            jsonfile.writeFile('configuration.json', {number: 1});
            configurar();
        }
      })
}

module.exports = { configurar };