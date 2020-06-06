const mongoose = require('mongoose');

const PlayareaSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  area: {
    type: String,
    required: true,
  },
  type_of_playarea: {
    type: String,
    required: true,
  },
  playarea_name: {
    type: String,
    required: true,
  },

  age_group: {
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
  about_playarea: {
    type: String,
    required: true,
  },
  email_id: {
    type: String,
    required: true,
  },
  price_per_hour: {
    type: String,
    required: true,
  },
  no_of_support_staff: {
    type: String,
    required: true,
  },

  entry_fee: {
    type: String,
    required: true,
  },
  weekday_rate: {
    type: String,
    required: true,
  },
  weekend_rate: {
    type: String,
    required: true,
  },
  offers: {
    type: String,
  },
  packages: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  bonus_features: {
    type: String,
  },

  book_requirements: {
    type: String,
    required: true,
  },
  food: {
    type: String,
  },
  music: {
    type: String,
  },
  screen: {
    type: String,
  },
  kids_friendly: {
    type: String,
  },
  products_and_service_offered: {
    type: String,
  },
  branches: {
    type: String,
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
  google_location: {
    type: String,
    required: true,
  },
  pin_code: {
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

module.exports = Playarea = mongoose.model('playarea', PlayareaSchema);
