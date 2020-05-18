const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobileNo: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  childInformation: [
    {
      childName: {
        type: String,
        required: true,
      },
      age: {
        type: String,
        required: true,
      },
    },
  ],

  location: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    requires: true,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
