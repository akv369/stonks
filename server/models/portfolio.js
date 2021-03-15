const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    portfolioValue: {
        type: Number,
        required: true
    },
    investedValue: {
        type: Number,
        required: true
    },
    totalReturns: {
        type: Number,
        required: true
    },
    _1dReturns: {
        type: Number,
        required: true
    },
    stocks: [{
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        averagePrice: {
            type: Number,
            required: true
        },
        returns: {
            type: Number,
            required: true
        },
        returnsPercent: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        },
        valuePercent: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Portfolio', portfolioSchema)