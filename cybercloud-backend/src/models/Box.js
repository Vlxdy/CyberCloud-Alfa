const { Schema, model } = require('mongoose');
const boxSchema = new Schema({
    number:{
        type: Number,
        required: true,
        unique: true
    },
    used:{
        type:Boolean,
        default: false
    },
    group:{
        type: String
    },
    startdate:{
        type: Date
    },
    enddate:{
        type: Date
    },
    calendar:{
        init:{
            type:Date
        },
        end:{
            type:Date
        }
    }
});
module.exports = model('Box', boxSchema);