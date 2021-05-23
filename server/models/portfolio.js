const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
  userID: {
    type: String,
    ref: 'User',
    required: true,
  },
  portfolioValue: {
    type: Number,
  },
  investedValue: {
    type: Number,
    required: true,
  },
  totalReturns: {
    type: Number,
    required: true,
  },
  stocks: [
    {
      code: {
        type: String,
      },
      name: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      averagePrice: {
        type: Number,
      },
      returns: {
        type: Number,
      },
      returnsPercent: {
        type: Number,
      },
      value: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
