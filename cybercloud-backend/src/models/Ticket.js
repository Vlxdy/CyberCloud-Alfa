const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    id_user:{
        type: String,
        default: "anonymous"
    },
    id_operator:{
        type:String,
        default:null
    },
    id_caja:{
        type: String,
        default: null
    },
    terminals: [{
        nrotermial:{
            type:Number,
            default: null
        },
        inittime:{
            type: Date,
            default: null
        },
        endtime:{
            type: Date,
            default: null
        }
    }],
    id_rate:{
        type:String,
        default: null
    },
    paid:{
        type: Number,
        default: 0
    },
    items:[
        {
            id:{
                type: String,
                default: null
            },
            description:{
                type: String,
                default: null
            },
            price:{
                type: Number,
                default: null
            },
            amount:{
                type: Number,
                default: null
            }
        }
    ]
},{
    timestamps:true
})

module.exports = model('Ticket', ticketSchema)