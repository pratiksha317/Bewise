const mongoose = require('mongoose');

const CreativeActivitySchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  registration_no: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  organisation_name: {
    type: String,
    required: true,
  },
  type_of_orgainsation: {
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
  sub_sub_type: {
    type: String,
  },
  // trainee_name: {
  //   type: String,
  //   required: true,
  // },
  min_age: {
    type: String,
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
  about: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },
  sub_type: {
    type: String,
  },
  type_other: {
    type: String,
  },
  number_of_trainee: {
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
  class_frequency: {
    type: String,
    required: true,
  },
  fax_number: {
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
  //   },
  // ],
});
module.exports = CreativeActivity = mongoose.model(
  'creativeActivity',
  CreativeActivitySchema
);
