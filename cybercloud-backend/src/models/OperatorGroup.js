const { Schema, model } = require('mongoose');
const OperatorGroupSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required:true
    },
    operator:[{
        type: String
    }]
},{
    timestamps: true
});
module.exports = model('OperatorGroup', OperatorGroupSchema);