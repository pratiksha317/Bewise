const mongoose = require('mongoose');

const CampSchema = new mongoose.Schema({
  vender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vender',
  },
  registration_no: {
    type: String,
    required: true,
  },
  // area: {
  //   type: String,
  //   required: true,
  // },
  // period: {
  //   type: String,
  //   required: true,
  // },
  camp_name: {
    type: String,
    required: true,
  },
  invities: {
    type: String,
    required: true,
  },

  // type_of_the_camps: {
  //   type: String,
  //   required: true,
  // },
  contact_person: {
    type: String,
    required: true,
  },
  email_id: {
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
  when: {
    type: String,
    required: true,
  },
  where: {
    type: String,
    required: true,
  },
  registeration: {
    type: String,
    required: true,
  },

  // phone_number: {
  //   type: String,
  //   required: true,
  // },
  // landline_number: {
  //   type: String,
  //   required: true,
  // },
  // fax_number: {
  //   type: String,
  //   required: true,
  // },
  website: {
    type: String,
    required: true,
  },
  // country: {
  //   type: String,
  //   required: true,
  // },
  // state: {
  //   type: String,
  //   required: true,
  // },
  // location: {
  //   type: String,
  //   required: true,
  // },
  // pincode: {
  //   type: String,
  // },
  // address: {
  //   type: String,
  // },
  about_camp: {
    type: String,
    required: true,
  },
  // google_location: {
  //   type: String,
  //   required: true,
  // },

  // timing: {
  //   type: String,
  // },

  // avg_cost: {
  //   type: String,
  //   required: true,
  // },

  images: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    // required: true,
  },
});

module.exports = Camps = mongoose.model('camps', CampSchema);
