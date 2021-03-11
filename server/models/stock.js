const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cmp: {
        type: Number,
        required: true
    },
    _200dma: {
        type: Number,
        required: true
    },
    _52wh: {
        type: Number,
        required: true
    },
    _52wl: {
        type: Number,
        required: true
    },
    marketCap: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    roe: {
        type: Number,
        required: true
    },
    peRatio: {
        type: Number,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    marketCapitalization: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema)