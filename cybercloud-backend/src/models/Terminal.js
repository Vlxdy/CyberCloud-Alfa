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
        times:[{
            number:{
                type: Number,
                default: null
            },
            inittime:{
                type:Date,
                default: null
            },
            endtime:{
                type:Date,
                default:null
            }
        }],
        accumulated:{
            type:Number,
            default: 0
        },
        price:{
            type:Number,
            default: 0
        },
        rate:{
            type: String,
            default: null
        },
        rate_i:{
            type: Number,
            default: 0
        },
        articles:[{
            articles_id:String,
            description:{
                type: String
            },
            price:{
                type: Number    
            },
            amount:{
                type: Number,
                default: 0
            },
        }],
        user:{
            id:{
                type:String,
                default: "0"
            },
            name:{
                type: String,
                default: ""
            }
        },
        items:[{
            item_id:String,
            description:String,
            price:Number,
            amount:{
                type: Number,
                default: 0
            }
        }]
    })

module.exports = model('Terminal', terminalSchema)