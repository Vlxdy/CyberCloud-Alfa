const { Schema, model } = require('mongoose');
const intervalSchema = new Schema({
    time:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        default: 0
    }
});
module.exports = model('Interval', intervalSchema)