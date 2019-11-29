const { Schema, model } = require('mongoose');
const StockSchema = new Schema({
    operador: {
        type: String
    },
    amount: {
        type: Number,
        default: 0
    },
    article: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = model('Stock', StockSchema);