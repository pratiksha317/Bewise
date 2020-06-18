const mongoose = require('mongoose');

const EntatainerSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  entatainer: {
    type: String,
    required: true,
  },

  contact_person: {
    type: String,
    required: true,
  },

  email_id: {
    type: String,
    required: true,
  },

  phone_number: {
    type: String,
    required: true,
  },

  website: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },

  twitter: {
    type: String,
    required: true,
  },

  fees: {
    type: String,
    required: true,
  },

  images: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    required: true,
  },
});

module.exports = Entatainer = mongoose.model('entatainer', EntatainerSchema);
