const mongoose = require('mongoose');

const PreschoolSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  registration_no: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  schoolName: {
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
  about_school: {
    type: String,
    required: true,
  },
  google_location: {
    type: String,
    required: true,
  },
  schoolType: {
    type: String,
    required: true,
  },
  board_of_education: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  opening_timimg: {
    type: String,
    required: true,
  },
  number_of_teachers: {
    type: String,
    required: true,
  },
  establishment_Year: {
    type: String,
    required: true,
  },
  avg_anual_fee: {
    type: String,
    required: true,
  },
  other_fee: {
    type: String,
    required: true,
  },
  addmission_fee: {
    type: String,
    required: true,
  },
  admission_link: {
    type: String,
    required: true,
  },
  processing_fee: {
    type: String,
    required: true,
  },
  required_document: {
    type: String,
    required: true,
  },
  admission_process: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mode_of_payment: {
    type: String,
    required: true,
  },
  isrefund: {
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

module.exports = Preschool = mongoose.model('preschool', PreschoolSchema);
