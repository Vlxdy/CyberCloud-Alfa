const express = require('express');
const cors = require('cors');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(cors());
app.use(express.json());

// routes

app.use('/api/terminals',require('./routes/terminals'));
app.use('/api/test',require('./routes/terminalstest'));
app.use('/api/rate',require('./routes/rates'));

module.exports = app;