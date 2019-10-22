const { Schema, model } = require('mongoose');
const petitionsSchema = new Schema({
    user:{
        type: String,
        default: "anonymous"
    },
    username:{
        type:String,
        default: "anonymous"
    },
    terminal:{
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
    }],
    cost:{
        type: Number,
        default: 0
    }
    
});
module.exports = model('Petitions', petitionsSchema)