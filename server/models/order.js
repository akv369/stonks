const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userID: {
        type: String,
        ref: 'User',
        required: true
    },
    code: {
        type: String,
        ref: 'Stock',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    order: {
        type: String,
        required: true
    },
    subType: {
        type: String,
        required: true
    },
    balanceBeforeTransaction: {
        type: Number,
        required: true
    },
    balanceAfterTransaction: {
        type: Number
    },
    orderPrice: {
        type: Number,
        required: true
    },
    cmp: {
        type: Number,
        required: true
    },
    exchange: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    progress: {
        type: String,
        required: true
    },
    verifiedTimestamp: {
        type: Date,
        required: true
    },
    placedTimestamp: {
        type: Date
    },
    executedTimestamp: {
        type: Date
    },
    totalAmount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema)