const mongoose = require('mongoose');

const PartySchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  area: {
    type: String,
    required: true,
  },
  incharge_name: {
    type: String,
    required: true,
  },
  partyhall_name: {
    type: String,
    required: true,
  },
  type_of_the_party: {
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
  about_partyhall: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },

  number_of_people_in_hall: {
    type: String,
    required: true,
  },

  timing: {
    type: String,
  },
  weekday_rates: {
    type: String,
    required: true,
  },
  weekend_rates: {
    type: String,
    required: true,
  },
  establishment_Year: {
    type: String,
    required: true,
  },

  avg_cost: {
    type: String,
    required: true,
  },

  images: {
    type: String,
  },
});

module.exports = PartyHall = mongoose.model('partyhall', PartySchema);
