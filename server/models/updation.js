const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updationSchema = new Schema({
  lastUpdated: {
    type: Date,
    required: true,
  },
  codes: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Updation', updationSchema);
