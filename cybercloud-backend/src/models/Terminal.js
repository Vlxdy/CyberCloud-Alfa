const { Schema, model } = require('mongoose');
const terminalSchema = new Schema(
    {
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
        times:[{
            inittime:{
                type:Date,
                default: null
            },
            endtime:{
                type:Date,
                default:null
            }
        }],
        rate:{
            type: String,
            default: null
        }
    })

module.exports = model('Terminal', terminalSchema)