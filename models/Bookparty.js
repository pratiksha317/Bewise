const mongoose = require('mongoose');

const BookpartySchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  name: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  from_time: {
    type: String,
    required: true,
  },
  to_time: {
    type: String,
    required: true,
  },
  addinitional_features: {
    type: String,
    required: true,
  },
  vender: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  flavour: {
    type: String,
    required: true,
  },
});

module.exports = Bookparty = mongoose.model('bookparty', BookpartySchema);
