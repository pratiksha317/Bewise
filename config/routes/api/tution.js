const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Tution = require('../../../models/Tution');
const { check, validationResult } = require('express-validator');
var multer = require('multer');

//@route GET api/tution
//@desc  Create or Update tution
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
      check('owner_name', 'owner_name is required').not().isEmpty(),
      check('tutor_name', 'tutor_name is required').not().isEmpty(),
      check('tution_name', 'tution_name is required').not().isEmpty(),
      check('tution_type', 'tution_type is required').not().isEmpty(),
      check('class_range', 'class_range is required').not().isEmpty(),
      check('board_of_education', 'board_of_education is required')
        .not()
        .isEmpty(),
      check('class_frequency', 'class_frequency is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country year is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_tution', 'about_tution is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('subject', 'subject is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('number_of_teachers', 'number_of_teachers is required')
        .not()
        .isEmpty(),
      check('timing', 'timing is required').not().isEmpty(),
      check('instruction_lang', 'instruction_lang is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),
      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
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
        fileurl.push('http:' + req.hostname + ':' + 5000 + '/' + result.path);
        saveurldb.push(result.path);
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      area,
      tutor_name,
      owner_name,
      tution_name,
      tution_type,
      board_of_education,
      class_frequency,
      class_range,
      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about_tution,
      google_location,
      subject,
      grade,
      number_of_teachers,
      timing,
      instruction_lang,
      establishment_Year,
      avg_anual_fee,
      addmission_fee,
    } = req.body;
    images =
      'http:' + req.hostname + ':' + 5000 + '/' + req.files.images[0].path;
    photos = fileurl.join();

    // Build School Object
    const tutionFeilds = {};
    tutionFeilds.vender = req.vender.id;

    if (area) tutionFeilds.area = area;
    if (owner_name) tutionFeilds.owner_name = owner_name;
    if (tutor_name) tutionFeilds.tutor_name = tutor_name;
    if (tution_name) tutionFeilds.tution_name = tution_name;
    if (tution_type) tutionFeilds.tution_type = tution_type;
    if (class_range) tutionFeilds.class_range = class_range;
    if (board_of_education)
      tutionFeilds.board_of_education = board_of_education;
    if (class_frequency) tutionFeilds.class_frequency = class_frequency;
    if (email_id) tutionFeilds.email_id = email_id;
    if (phone_number) tutionFeilds.phone_number = phone_number;
    if (landline_number) tutionFeilds.landline_number = landline_number;
    if (fax_number) tutionFeilds.fax_number = fax_number;
    if (website) tutionFeilds.website = website;
    if (country) tutionFeilds.country = country;
    if (state) tutionFeilds.state = state;
    if (location) tutionFeilds.location = location;
    if (pincode) tutionFeilds.pincode = pincode;
    if (address) tutionFeilds.address = address;
    if (about_tution) tutionFeilds.about_tution = about_tution;
    if (google_location) tutionFeilds.google_location = google_location;
    if (subject) tutionFeilds.subject = subject;
    if (grade) tutionFeilds.grade = grade;
    if (number_of_teachers)
      tutionFeilds.number_of_teachers = number_of_teachers;
    if (timing) tutionFeilds.timing = timing;
    if (instruction_lang) tutionFeilds.instruction_lang = instruction_lang;
    if (establishment_Year)
      tutionFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) tutionFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) tutionFeilds.addmission_fee = addmission_fee;
    if (images) tutionFeilds.images = images;
    if (photos) tutionFeilds.photos = photos;

    try {
      let tution = await Tution.findOne({ _id: req.vender.id });

      // if (tution) {
      //   //Update
      //   tution = await Tution.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: tutionFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'data updated successfully',
      //     data: tution,
      //   });
      // }

      //Create
      tution = new Tution(tutionFeilds);

      await tution.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: tution,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/tution
//@desc  Get all tution
//access  Public

router.get('/', async (req, res) => {
  try {
    const tution = await Tution.find();
    console.log([tution]);
    return res.json({
      status: 1,
      message: 'success',
      data: tution,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/tution/view
//@desc  Get all tution of preffered data
//access  Public

router.get('/view', (req, res, next) => {
  Tution.find()
    .select('tution_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        tution: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            tution_name: doc.tution_name,
            email_id: doc.email_id,
            phone_number: doc.phone_number,
            location: doc.location,
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

//@route GET api/tution/vender/vender_id
//@desc  Get tution by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const tution = await Tution.findOne({
      _id: req.params.vender_id,
    });

    if (!tution)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: tution,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

// //@route  DELETE api/tution/:_id
// //@desc   Delete  Tution
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  Tution.remove({ _id: id })
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
//@desc  Search tution  by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Tution.find(
    {
      location: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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
//@desc  Search tution  by tution_type
//access  Public

router.get('/tution_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  Tution.find(
    {
      tution_type: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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

//@route GET api/class_range/:query
//@desc  Search tution  by class_range
//access  Public

router.get('/class_range/:query', cors(), function (req, res) {
  var query = req.params.query;

  Tution.find(
    {
      class_range: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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

//@route GET api/board_of_education/:query
//@desc  Search tution  by board_of_education
//access  Public

router.get('/board_of_education/:query', cors(), function (req, res) {
  var query = req.params.query;

  Tution.find(
    {
      board_of_education: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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

//@route GET api/class_frequency/:query
//@desc  Search tution  by class_frequency
//access  Public

router.get('/class_frequency/:query', cors(), function (req, res) {
  var query = req.params.query;

  Tution.find(
    {
      class_frequency: query,
    },
    function (err, tution) {
      if (err) throw err;
      if (tution) {
        res.json(tution);
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
