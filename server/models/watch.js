const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const watchSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: true,
  },
  cmp: {
    type: Number,
    required: true,
  },
  _200dma: {
    type: Number,
    required: true,
  },
  peRatio: {
    type: Number,
    required: true,
  },
  newsScore: {
    type: Number,
    required: true,
  },
  userScore: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Watch', watchSchema);
