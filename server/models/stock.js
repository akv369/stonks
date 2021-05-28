const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
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
  change: {
    type: Number,
    required: true,
  },
  tChange: {
    type: Number,
    required: true,
  },
  pChange: {
    type: Number,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  _200dma: {
    type: Number,
    required: true,
  },
  _52wh: {
    type: Number,
    required: true,
  },
  _52wl: {
    type: Number,
    required: true,
  },
  open: {
    type: Number,
    required: true,
  },
  high: {
    type: Number,
    required: true,
  },
  low: {
    type: Number,
    required: true,
  },
  previousClose: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: String,
    required: true,
  },
  marketCapitalization: {
    type: Number,
    required: true,
  },
  roe: {
    type: Number,
    required: true,
  },
  peRatio: {
    type: Number,
    required: true,
  },
  pegRatio: {
    type: Number,
    required: true,
  },
  ebitda: {
    type: String,
    required: true,
  },
  divYield: {
    type: Number,
    required: true,
  },
  bookValue: {
    type: Number,
    required: true,
  },
  eps: {
    type: Number,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  exchange: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Stock', stockSchema);
