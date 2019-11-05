const { Schema, model } = require('mongoose');
const itemSchema = new Schema({
    description:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    service:{
        type: Boolean,
        required: true,
        default: false
    },
    catidad:{
        type: Number,
        default: 0
    },
    image:{
        type: String,
        default: "item.png"
    }
});
module.exports = model('Item', itemSchema)