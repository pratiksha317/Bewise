const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Vender = require('../../../models/Vender');
const Entatainer = require('../../../models/Entatainer');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route GET api/school
//@desc  Create events
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
      check('name', 'name is required').not().isEmpty(),
      check('type', 'type is required').not().isEmpty(),
      check('entatainer', 'entatainer is required').not().isEmpty(),
      check('contact_person', 'contact_person is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('facebook', 'facebook year is required').not().isEmpty(),
      check('twitter', 'twitter is required').not().isEmpty(),
      check('fees', 'fees is required').not().isEmpty(),
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
      name,
      type,
      entatainer,
      contact_person,
      email_id,
      phone_number,
      website,
      facebook,
      twitter,
      fees,
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

    // Build Object
    const venueFeilds = {};
    venueFeilds.vender = req.vender.id;
    if (name) venueFeilds.name = name;
    if (type) venueFeilds.type = type;
    if (entatainer) venueFeilds.entatainer = entatainer;
    if (fees) venueFeilds.fees = fees;
    if (contact_person) venueFeilds.contact_person = contact_person;
    if (email_id) venueFeilds.email_id = email_id;
    if (phone_number) venueFeilds.phone_number = phone_number;
    if (website) venueFeilds.website = website;
    if (facebook) venueFeilds.facebook = facebook;
    if (twitter) venueFeilds.twitter = twitter;
    if (images) venueFeilds.images = images;
    if (photos) venueFeilds.photos = photos;

    try {
      let entatainer = await Entatainer.findOne({ _id: req.vender.id });

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
      entatainer = new Entatainer(venueFeilds);

      await entatainer.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: entatainer,
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
    const entatainer = await Entatainer.find().populate('vender', 'owner_name');
    console.log([entatainer]);
    return res.json({
      status: 1,
      message: 'success',
      data: entatainer,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/partyhall/vender/vender_id
//@desc  Get partyhall by Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const entatainer = await Entatainer.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

    if (!entatainer)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: entatainer,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route  DELETE api/partyhall/:_id
//@desc   Delete  partyhall
//access  Public

// router.delete('/:_id', (req, res, next) => {
//   const id = req.params._id;
//   Entatainer.remove({ _id: id })
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
