const { Schema, model } = require('mongoose');
const itemSchema = new Schema({
    _id:{
        type: String,
        required: true,
        unique:true
    },
    items:[{
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
            required: true
        },
        catidad:{
            type: Number,
            default: 0
        },
        image:{
            type: String
        }}
    ]
    
});
module.exports = model('Item', itemSchema)