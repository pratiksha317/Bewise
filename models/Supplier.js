const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  name: {
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

  images: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    required: true,
  },
});

module.exports = Supplier = mongoose.model('supplier', SupplierSchema);
