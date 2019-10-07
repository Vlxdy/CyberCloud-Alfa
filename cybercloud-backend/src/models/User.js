const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    firstname:{
        type:String,
        required:true
    },
    celular:{
        type: Number
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
    permissions:[
        {
            type:String,
            default: null
        }
    ]
},{
    timestamps:true
})

module.exports = model('User',userSchema)