const { Schema, model } = require('mongoose');
const RechargeSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    operator_id:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        default: 0
    },
    numberBox:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
});
module.exports = model('Recharge', RechargeSchema)