const { Schema, model } = require('mongoose');
const SettingsSchema = new Schema({
    numberBox: {
        type: Number
    },
    boxStatus: {
        type: Boolean,
        default: false
    },
    rate: [
        {
            type: String                
        }
    ],
    name: {
        type: String,
        default: "CyberCloud"
    }
});
module.exports = model('Settings', SettingsSchema)