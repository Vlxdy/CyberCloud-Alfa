const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    group: {
        type: String,
        default: "0"
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    operator: {
        type: Boolean,
        default: false
    },
    permissions: [
        {
            type: Boolean,
            default: false
        }
    ],
    money: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
    items: [{
        article: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        amount: {
            type: Number,
            default: 0
        }
    }]
}, {
    timestamps: true
})

module.exports = model('User', userSchema)