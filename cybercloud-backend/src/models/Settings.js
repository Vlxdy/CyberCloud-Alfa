const { Schema, model } = require('mongoose');
const SettingsSchema = new Schema({
    numberBox:{
        type: Number
    },
    rate:{
        type: String,
        default: "0"
    },
    name:{
        type:String,
        default: "CyberCloud"
    }
});
module.exports = model('Settings', SettingsSchema)