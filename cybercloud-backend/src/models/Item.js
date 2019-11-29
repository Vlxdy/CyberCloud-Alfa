const { Schema, model } = require('mongoose');
const itemSchema = new Schema({
    description:{
        type: String,
        required: true,
        unique: true
    },
    available:{
        type: Boolean,
        default: true
    },
    price:{
        type: Number,
        required: true
    },
    service:{
        type: Boolean,
        default: false
    },
    amount:{
        type: Number,
        default: 0
    },
    image:{
        type: String,
        default: "item.png"
    }
});
module.exports = model('Item', itemSchema)