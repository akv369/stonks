const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const graphSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
  },
  values: [
    {
      datetime: {
        type: String,
        required: true,
      },
      open: {
        type: String,
        required: true,
      },
      high: {
        type: String,
        required: true,
      },
      low: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
      volume: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Graph', graphSchema);
