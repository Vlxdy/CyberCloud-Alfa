const { Schema, model } = require('mongoose');
const boxSchema = new Schema({
    number:{
        type: Number,
        required: true,
        unique: true
    },
    startdate:{
        type: Date
    },
    enddate:{
        type: Date
    },
    Operator:{
        init: String,
        closed: String
    }
});
module.exports = model('Box', boxSchema);