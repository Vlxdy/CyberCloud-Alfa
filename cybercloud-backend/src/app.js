const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");
const fileUpload = require('express-fileupload')
// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

app.use(express.static('public'));
app.use(fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 }
  }));
// routes

app.use('/api/terminals',require('./routes/terminals'));
app.use('/api/test',require('./routes/terminalstest'));
app.use('/api/rate',require('./routes/rates'));
app.use('/api/item',require('./routes/items'));
app.use('/api/itembag',require('./routes/itembag'));
app.use('/api/ticket',require('./routes/tickets'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/signin',require('./routes/signIn'));
app.use('/api/image',require('./routes/image'));


//image upload

app.post('/api/upload',(req,res) => {
    req.files.image.mv('./public/images/'+req.files.image.name,err => {
        if(err) return res.status(500).send({ status: false, message : err })
        return res.status(200).send({ status : true })
    })
    //console.log(req.files.image);
})

module.exports = app;