const mongoose = require('mongoose');

const DrawSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  area: {
    type: String,
    required: true,
  },
  organisation_name: {
    type: String,
    required: true,
  },
  artist_name: {
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
  about_school: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },

  type_of_drawing: {
    type: String,
    required: true,
  },
  available_days: {
    type: String,
    required: true,
  },
  number_of_artist: {
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
  },
});

module.exports = Drawing = mongoose.model('drawing', DrawSchema);
