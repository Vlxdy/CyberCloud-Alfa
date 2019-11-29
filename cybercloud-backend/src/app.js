const express = require('express');
const cors = require('cors');
const app = express();
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
app.use('/api/configuration',require('./routes/configuration'));
app.use('/api/rate',require('./routes/rates'));
app.use('/api/item',require('./routes/items'));
app.use('/api/itembag',require('./routes/itembag'));
app.use('/api/ticket',require('./routes/tickets'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/signin',require('./routes/signIn'));
app.use('/api/image',require('./routes/image'));
app.use('/api/itemuser',require('./routes/itemuser'));
app.use('/api/petition',require('./routes/petitions'));
app.use('/api/itempurchased', require('./routes/itempurchased'));
app.use('/api/interval', require('./routes/interval'));
app.use('/api/box', require('./routes/box'));
app.use('/api/recharge', require('./routes/recharge'));
app.use('/api/usedterminal', require('./routes/usedterminal'));
app.use('/api/user', require('./routes/user'));
app.use('/api/itemterminal', require('./routes/itemterminal'));
app.use('/api/bagterminal', require('./routes/bagterminal'));
app.use('/api/primary', require('./routes/primary'));
app.use('/api/userhistory', require('./routes/userhistory'));
app.use('/api/terminalsbeta', require('./routes/terminalsbeta'));
app.use('/api/registry', require('./routes/registry'));
app.use('/api/operator', require('./routes/operator'));
app.use('/api/permission', require('./routes/permission'));
app.use('/api/operatorgroup', require('./routes/operatorgroup'));
app.use('/api/stock', require('./routes/stock'));


//image upload

app.post('/api/upload',(req,res) => {
    req.files.image.mv('./public/images/'+req.files.image.name,err => {
        if(err) return res.status(500).send({ status: false, message : err })
        return res.status(200).send({ status : true })
    })
    //console.log(req.files.image);
})


module.exports = app;