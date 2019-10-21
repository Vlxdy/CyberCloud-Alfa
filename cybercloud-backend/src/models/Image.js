const { Schema, model } = require('mongoose');
const imageSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    detail:{
        type:String,
        default:""
    }
});
module.exports = model('Image', imageSchema)