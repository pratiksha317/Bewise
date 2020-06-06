const express = require('express');
const config = require('config');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const CreativeActivity = require('../../../models/CreativeActivity');
const { check, validationResult } = require('express-validator');
var multer = require('multer');
var mongoose = require('mongoose');

//@route GET api/creative activity
//@desc  Create creative activity
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
      check('area', 'area is required').not().isEmpty(),
      check('registration_no', 'registeration_number is required')
        .not()
        .isEmpty(),
      check('organisation_name', 'organisation_name is required')
        .not()
        .isEmpty(),
      check('type_of_orgainsation', 'type_of_orgainsation is required')
        .not()
        .isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('min_age', 'min_age is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location year is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about', 'about is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('type', 'type is required').not().isEmpty(),
      check('number_of_trainee', 'number_of_trainee is required')
        .not()
        .isEmpty(),

      check('timing', 'timing is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),

      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
      check('class_frequency', 'class_frequency is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
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
      area,
      organisation_name,
      type_of_orgainsation,
      email_id,
      fax_number,
      phone_number,
      landline_number,
      min_age,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about,
      google_location,
      type,
      sub_type,
      type_other,
      number_of_trainee,
      timing,
      avg_anual_fee,
      addmission_fee,
      establishment_Year,
      sub_sub_type,
      class_frequency,
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

    // Build sports Object
    const sportsFeilds = {};
    sportsFeilds.vender = req.vender.id;

    if (registration_no) sportsFeilds.registration_no = registration_no;
    if (area) sportsFeilds.area = area;
    if (organisation_name) sportsFeilds.organisation_name = organisation_name;
    if (type_of_orgainsation)
      sportsFeilds.type_of_orgainsation = type_of_orgainsation;
    if (min_age) sportsFeilds.min_age = min_age;
    if (class_frequency) sportsFeilds.class_frequency = class_frequency;
    if (email_id) sportsFeilds.email_id = email_id;
    if (phone_number) sportsFeilds.phone_number = phone_number;
    if (landline_number) sportsFeilds.landline_number = landline_number;
    if (fax_number) sportsFeilds.fax_number = fax_number;
    if (website) sportsFeilds.website = website;
    if (country) sportsFeilds.country = country;
    if (state) sportsFeilds.state = state;
    if (location) sportsFeilds.location = location;
    if (pincode) sportsFeilds.pincode = pincode;
    if (address) sportsFeilds.address = address;
    if (about) sportsFeilds.about = about;
    if (google_location) sportsFeilds.google_location = google_location;
    if (type) sportsFeilds.type = type;
    if (sub_type) sportsFeilds.sub_type = sub_type;
    if (type_other) sportsFeilds.type_other = type_other;
    if (timing) sportsFeilds.timing = timing;
    if (establishment_Year)
      sportsFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) sportsFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) sportsFeilds.addmission_fee = addmission_fee;
    if (number_of_trainee) sportsFeilds.number_of_trainee = number_of_trainee;
    if (sub_sub_type) sportsFeilds.sub_sub_type = sub_sub_type;
    if (images) sportsFeilds.images = images;
    if (photos) sportsFeilds.photos = photos;

    try {
      let creativeActivity = await CreativeActivity.findOne({
        _id: req.vender.id,
      });

      // if (sports) {
      //   //Update
      //   sports = await Sports.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: sportsFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'data updated successfully',
      //     data: sports,
      //   });
      // }

      //Create
      creativeActivity = new CreativeActivity(sportsFeilds);

      await creativeActivity.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: creativeActivity,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/creative activity
//@desc  Get all creative activity
//access  Public

router.get('/', async (req, res) => {
  try {
    const creativeActivity = await CreativeActivity.find();
    console.log([creativeActivity]);
    return res.json({
      status: 1,
      message: 'success',
      data: creativeActivity,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/creativeActivity/view
//@desc  Get all creative activity by preffered data
//access  Public

router.get('/view', (req, res, next) => {
  CreativeActivity.find()
    .select(
      'organisation_name  email_id  phone_number location type_of_orgainsation'
    )
    .exec()
    .then((docs) => {
      const response = {
        creativeActivity: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            organisation_name: doc.organisation_name,
            email_id: doc.email_id,
            phone_number: doc.phone_number,
            location: doc.location,
            type_of_orgainsation: doc.type_of_orgainsation,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// //@route GET api/creativeActivity/vender/vender_id
// //@desc  Get school by User Id
// //access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const creativeActivity = await CreativeActivity.findOne({
      _id: req.params.vender_id,
    });
    console.log([creativeActivity]);
    if (!creativeActivity)
      return res.status(400).json({ status: 0, msg: 'data not found' });
    return res.json({
      status: 1,
      message: 'success',
      data: creativeActivity,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route  DELETE api/creativeActivity/:_id
//@desc   Delete  creativeActivity
//access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  CreativeActivity.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ status: 1, message: ' Deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//@route GET api/find/:query
//@desc  Search creativeActivity by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  CreativeActivity.find(
    {
      location: query,
    },
    function (err, creativeActivity) {
      if (err) throw err;
      if (creativeActivity) {
        res.json(creativeActivity);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          })
        );
      }
    }
  );
});

//@route GET api/find/:query
//@desc  Search creativeActivity  by type
//access  Public

router.get('/type/:query', cors(), function (req, res) {
  var query = req.params.query;

  CreativeActivity.find(
    {
      type: query,
    },
    function (err, creativeActivity) {
      if (err) throw err;
      if (creativeActivity) {
        res.json(creativeActivity);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          })
        );
      }
    }
  );
});

//@route GET api/find/:query
//@desc  Search creativeActivity school by sub_type
//access  Public

router.get('/sub_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  CreativeActivity.find(
    {
      sub_type: query,
    },
    function (err, creativeActivity) {
      if (err) throw err;
      if (creativeActivity) {
        res.json(creativeActivity);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          })
        );
      }
    }
  );
});

//@route GET api/find/:query
//@desc  Search creativeActivity  by type of organisation
//access  Public

router.get('/type_of_orgainsation/:query', cors(), function (req, res) {
  var query = req.params.query;

  CreativeActivity.find(
    {
      type_of_orgainsation: query,
    },
    function (err, creativeActivity) {
      if (err) throw err;
      if (creativeActivity) {
        res.json(creativeActivity);
      } else {
        res.send(
          JSON.stringify({
            error: 'Error',
          })
        );
      }
    }
  );
});

module.exports = router;
