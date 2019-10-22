const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
        type: String
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    permissions:{
        type: Number,
        default: 0
    },
    money:{
        type: Number,
        default: 0
    },
    items:[{
        article:{
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
        amount:{
            type: Number,
            default: 0
        }
    }]
},{
    timestamps:true
})

module.exports = model('User',userSchema)