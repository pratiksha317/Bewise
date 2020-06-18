const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Vender = require('../../../models/Vender');
const Cake = require('../../../models/Cake');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route GET api/cake
//@desc  Create cake
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
      check('name', 'name is required').not().isEmpty(),
      check('type', 'type is required').not().isEmpty(),
      check('features', 'features is required').not().isEmpty(),
      check('contact_person', 'contact_person is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('facebook', 'facebook year is required').not().isEmpty(),
      check('twitter', 'twitter is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('about', 'about is required').not().isEmpty(),
      check('establishment_year', 'establishment_year is required')
        .not()
        .isEmpty(),
      check('mode_of_payment', 'mode_of_payment is required').not().isEmpty(),
      check('product', 'product is required').not().isEmpty(),
      check('timing', 'timing year is required').not().isEmpty(),
      check('popular_flavours', 'popular_flavours is required').not().isEmpty(),
      check('flavours', 'flavours is required').not().isEmpty(),
      check('price_range', 'price_range is required').not().isEmpty(),
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
      features,
      contact_person,
      email_id,
      phone_number,
      website,
      facebook,
      twitter,
      establishment_year,
      google_location,
      about,
      mode_of_payment,
      product,
      timing,
      popular_flavours,
      flavours,
      price_range,
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

    // Build Venue Object
    const cakeFeilds = {};
    cakeFeilds.vender = req.vender.id;

    if (registration_no) cakeFeilds.registration_no = registration_no;
    if (type) cakeFeilds.type = type;
    if (name) cakeFeilds.name = name;
    if (features) cakeFeilds.features = features;
    if (contact_person) cakeFeilds.contact_person = contact_person;
    if (email_id) cakeFeilds.email_id = email_id;
    if (phone_number) cakeFeilds.phone_number = phone_number;
    if (establishment_year) cakeFeilds.establishment_year = establishment_year;
    if (mode_of_payment) cakeFeilds.mode_of_payment = mode_of_payment;
    if (website) cakeFeilds.website = website;
    if (product) cakeFeilds.product = product;
    if (timing) cakeFeilds.timing = timing;
    if (about) cakeFeilds.about = about;
    if (facebook) cakeFeilds.facebook = facebook;
    if (twitter) cakeFeilds.twitter = twitter;
    if (google_location) cakeFeilds.google_location = google_location;
    if (popular_flavours) cakeFeilds.popular_flavours = popular_flavours;
    if (flavours) cakeFeilds.flavours = flavours;
    if (price_range) cakeFeilds.price_range = price_range;
    if (images) cakeFeilds.images = images;
    if (photos) cakeFeilds.photos = photos;

    try {
      let cake = await Cake.findOne({ _id: req.vender.id });

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
      cake = new Cake(cakeFeilds);

      await cake.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: cake,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

// //@route GET api/cake
// //@desc  Get all cake
// //access  Public

router.get('/', async (req, res) => {
  try {
    const cake = await Cake.find().populate('vender', 'owner_name');
    console.log([cake]);
    return res.json({
      status: 1,
      message: 'success',
      data: cake,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/cake/vender/vender_id
//@desc  Get cake by Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const cake = await Cake.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

    if (!cake)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: cake,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route  DELETE api/cake/:_id
//@desc   Delete  cake
//access  Public

// router.delete('/:_id', (req, res, next) => {
//   const id = req.params._id;
//   Cake.remove({ _id: id })
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
