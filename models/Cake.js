const mongoose = require('mongoose');

const CakeSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  registration_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  features: {
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

  google_location: {
    type: String,
    required: true,
  },

  establishment_year: {
    type: String,
    required: true,
  },

  mode_of_payment: {
    type: String,
    required: true,
  },

  product: {
    type: String,
    required: true,
  },

  timing: {
    type: String,
    required: true,
  },

  popular_flavours: {
    type: String,
    required: true,
  },

  flavours: {
    type: String,
    required: true,
  },
  price_range: {
    type: String,
    required: true,
  },

  about: {
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

module.exports = Cake = mongoose.model('cake', CakeSchema);
