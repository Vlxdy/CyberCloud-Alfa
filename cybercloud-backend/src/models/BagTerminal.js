const { Schema, model } = require('mongoose');
const BagTerminalSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        default: "item.png"
    },
    amount:{
        type: Number,
        default: 0
    }
});
module.exports = model('BagTerminal', BagTerminalSchema)