const { Schema, model } = require('mongoose');
const UsedTerminalSchema = new Schema({
    terminals:[{
        number: {
            type: Number,
            default: 0
        },
        inittime: {
            type: Date,
            default: null
        },
        endtime: {
            type: Date,
            default: null
        }
    }],
    user:{
        id:{
            type:String,
            default: "0"
        },
        name:{
            type: String,
            default: "anonymous"
        }
    },
    operator:{
        id:{
            type:String,
            default: "0"
        },
        name:{
            type: String,
            default: "anonymous"
        }
    },
    price:{
        type: Number,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    numberBox:{
        type: Number,
        default: 1
    }
},{
    timestamps: true
});
module.exports = model('UsedTerminal', UsedTerminalSchema)