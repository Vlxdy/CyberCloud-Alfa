const { Schema, model } = require('mongoose');
const timesSchema = new Schema({
    inittime:{
        type:Date,
        default: null
    },
    endtime:{
        type:Date,
        default:null
    }
})
module.exports = model('Times', timesSchema)