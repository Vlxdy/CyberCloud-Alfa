const { Schema, model } = require('mongoose');
const terminalOneSchema = new Schema(
    {
        id:{
            type: String,
            required: true,
            unique: true
        },
        number: {
            type: Number,
            required: true,
            unique: true
        },
        using:{
            type: Boolean,
            default:false
        },
        id_bill:{
            type:String,
            default: null
        },
        times:{
            type: Number
        },
        rate:[{
            time: {
                type: Number,
                required: true
            },
            cost:{
                type: Number,
                required: true
            }
        }],
        auxitime:{
            type:Number
        },
        index:{
            type:Number
        },
        cost:{
            type:Number
        },
        user:{
            id:{
                type:String,
                default: "0"
            },
            name:{
                type: String,
                default: ""
            }
        }
    })

module.exports = model('TerminalOne', terminalOneSchema)