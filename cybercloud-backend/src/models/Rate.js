const { Schema, model } = require('mongoose');
const rateSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    interval:[{
        time: {
            type: Number,
            required: true
        },
        cost:{
            type: Number,
            required: true
        }
    }]
});
module.exports = model('Rate', rateSchema)