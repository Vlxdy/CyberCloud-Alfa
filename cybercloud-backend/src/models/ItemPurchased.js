const { Schema, model } = require('mongoose');
const ItemPurchasedSchema = new Schema({
    id_item:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    user:{
        type: String,
        default: "anonymous"
    },
    username:{
        type: String,
        default: "anonymous"
    },
    operator:{
        type: String,
        default: "anonymous"
    },
    operatorname:{
        type: String,
        default: "anonymous"
    },
    price:{
        type: Number,
        required: true
    },
    amount:{
        type: Number,
        default: 0
    },
    numberBox:{
        type: Number,
        default: 1
    }
},{
    timestamps: true
});
module.exports = model('ItemPurchased', ItemPurchasedSchema)