const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Vender = require('../../../models/Vender');
const Venue = require('../../../models/Venue');
const Cake = require('../../../models/Cake');
const Entatainer = require('../../../models/Entatainer');
const Supplier = require('../../../models/Supplier');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route GET api/venue
//@desc  Create venue
//access  Private

router.post(
  '/',
  upload.fields([
    {
      name: 'images',
      maxCount: 1,
    },
    {
      name: 'photos',
      maxCount: 12,
    },
  ]),
  [
    auth,
    [
      check('registration_no', 'registration_no is required').not().isEmpty(),
      check('type', 'type is required').not().isEmpty(),
      check('name', 'venue_name is required').not().isEmpty(),
      check('invities', 'invities is required').not().isEmpty(),
      check('contact_person', 'contact_person is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('food', 'food is required').not().isEmpty(),
      check('hall_type', 'hall_type is required').not().isEmpty(),
      check('hall_capacity', 'hall_capacity is required').not().isEmpty(),
      check('dinning_hall_capacity', 'dinning_hall_capacity is required')
        .not()
        .isEmpty(),
      check('car_parking', 'car_parking year is required').not().isEmpty(),
      check('two_wheeler_parking', 'two_wheeler_parking is required')
        .not()
        .isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('facebook', 'facebook year is required').not().isEmpty(),
      check('twitter', 'twitter is required').not().isEmpty(),
      check('event_fee', 'event_fee is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('about', 'about is required').not().isEmpty(),
      check('address', 'address is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log('ss', req.files.photos);
    let fileurl = [];
    let saveurldb = [];
    let file = '';
    if (req.files.photos != undefined) {
      file = req.files.photos;
      file.forEach((result) => {
        fileurl.push(
          'http:' + '//' + req.hostname + ':' + 5000 + '/' + result.path
        );
        saveurldb.push(result.path);
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      registration_no,
      type,
      name,
      invities,
      contact_person,
      email_id,
      phone_number,
      food,
      hall_type,
      hall_capacity,
      dinning_hall_capacity,
      car_parking,
      two_wheeler_parking,
      website,
      facebook,
      twitter,
      event_fee,
      google_location,
      about,
      address,
      pincode,
    } = req.body;
    images =
      'http:' +
      '//' +
      req.hostname +
      ':' +
      5000 +
      '/' +
      req.files.images[0].path;
    photos = fileurl.join();

    // Build venue Object
    const venueFeilds = {};
    venueFeilds.vender = req.vender.id;

    if (registration_no) venueFeilds.registration_no = registration_no;
    if (type) venueFeilds.type = type;
    if (name) venueFeilds.name = name;
    if (invities) venueFeilds.invities = invities;
    if (contact_person) venueFeilds.contact_person = contact_person;
    if (email_id) venueFeilds.email_id = email_id;
    if (phone_number) venueFeilds.phone_number = phone_number;
    if (food) venueFeilds.food = food;
    if (hall_type) venueFeilds.hall_type = hall_type;
    if (website) venueFeilds.website = website;
    if (hall_capacity) venueFeilds.hall_capacity = hall_capacity;
    if (dinning_hall_capacity)
      venueFeilds.dinning_hall_capacity = dinning_hall_capacity;
    if (car_parking) venueFeilds.car_parking = car_parking;
    if (two_wheeler_parking)
      venueFeilds.two_wheeler_parking = two_wheeler_parking;
    if (facebook) venueFeilds.facebook = facebook;
    if (twitter) venueFeilds.twitter = twitter;
    if (google_location) venueFeilds.google_location = google_location;
    if (event_fee) venueFeilds.event_fee = event_fee;
    if (about) venueFeilds.about = about;
    if (address) venueFeilds.address = address;
    if (pincode) venueFeilds.pincode = pincode;
    if (images) venueFeilds.images = images;
    if (photos) venueFeilds.photos = photos;

    try {
      let venue = await Venue.findOne({ _id: req.vender.id });

      // if (partyhall) {
      //   //Update
      //   partyhall = await PartyHall.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: partyFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'data updated successfully',
      //     data: partyhall,
      //   });
      // }

      //Create
      venue = new Venue(venueFeilds);

      await venue.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: venue,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

// //@route GET api/partyhall
// //@desc  Get all partyhall
// //access  Public

router.get('/', async (req, res) => {
  try {
    const venue = await Venue.find().populate('vender', 'owner_name');
    console.log([venue]);
    return res.json({
      status: 1,
      message: 'success',
      data: venue,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// //@route GET api/partyhall/view
// //@desc  Get all prefered partyhall
// //access  Public

router.get('/view', async (req, res) => {
  try {
    const venue = await Venue.find().select(
      'name email_id contact_person type'
    );
    const cake = await Cake.find().select('name email_id contact_person type');
    const supplier = await Supplier.find().select(
      'name email_id contact_person type'
    );
    const entatiner = await Entatainer.find().select(
      'name email_id contact_person type'
    );
    console.log([venue]);
    return res.json({
      status: 1,
      message: 'success',
      data: [venue, cake, supplier, entatiner],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// //@route GET api/venue/vender/vender_id
// //@desc  Get venue by Id
// //access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const venue = await Venue.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

    if (!venue)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: venue,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route  DELETE api/venue/:_id
//@desc   Delete  venue
//access  Public

// router.delete('/:_id', (req, res, next) => {
//   const id = req.params._id;
//   Venue.remove({ _id: id })
//     .exec()
//     .then((result) => {
//       res.status(200).json({ status: 1, message: ' Deleted successfully' });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

module.exports = router;
