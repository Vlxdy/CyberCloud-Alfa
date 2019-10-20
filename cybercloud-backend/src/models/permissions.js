const { Schema, model } = require('mongoose');
const permissionsSchema = new Schema({
    numero:{
        type: numero,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    }
});
module.exports = model('permissions', permissionsSchema)