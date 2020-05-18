const mongoose = require('mongoose');

const SportsSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  area: {
    type: String,
    required: true,
  },
  owner_name: {
    type: String,
    required: true,
  },
  academy_name: {
    type: String,
    required: true,
  },
  sports_type: {
    type: String,
    required: true,
  },
  class_frequency: {
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
  landline_number: {
    type: String,
    required: true,
  },
  fax_number: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about_sports: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  sports: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  number_of_coach: {
    type: String,
    required: true,
  },

  timing: {
    type: String,
  },
  establishment_Year: {
    type: String,
    required: true,
  },

  avg_anual_fee: {
    type: String,
    required: true,
  },
  addmission_fee: {
    type: String,
    required: true,
  },

  images: {
    type: String,
    required: true,
  },
});

module.exports = Sports = mongoose.model('sports', SportsSchema);
