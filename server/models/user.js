const { Decimal128 } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  uid: {
    type: Decimal128,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      type: String,
      ref: 'Stock',
      required: true,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
