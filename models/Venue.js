const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
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
  invities: {
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
  food: {
    type: String,
    required: true,
  },
  hall_type: {
    type: String,
    required: true,
  },
  hall_capacity: {
    type: String,
    required: true,
  },
  dinning_hall_capacity: {
    type: String,
    required: true,
  },
  car_parking: {
    type: String,
    required: true,
  },
  two_wheeler_parking: {
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

  event_fee: {
    type: String,
    required: true,
  },

  google_location: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  pincode: {
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

module.exports = Venue = mongoose.model('venue', VenueSchema);
