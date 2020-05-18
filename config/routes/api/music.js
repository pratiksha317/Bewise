const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Music = require('../../../models/Music');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//@route GET api/music
//@desc  Create or Update music
//access  Private

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('music_schoolName', 'music_schoolName is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('min_age', 'min_age is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country  is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('music_type', 'music_type is required').not().isEmpty(),
      check('style', 'style is required').not().isEmpty(),
      check('number_of_trainee', 'number_of_trainee is required')
        .not()
        .isEmpty(),
      check('timing', 'timing is required').not().isEmpty(),
      check('specification', 'specification is required').not().isEmpty(),
      check('class_frequency', 'class_frequency is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      area,
      music_schoolName,
      grade,
      email_id,
      phone_number,
      landline_number,
      min_age,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about_school,
      google_location,
      music_type,
      style,
      number_of_trainee,
      timing,
      specification,
      class_frequency,
      establishment_Year,
      addmission_fee,
    } = req.body;

    // Build music feild Object
    const musicFeilds = {};
    musicFeilds.vender = req.vender.id;
    if (area) musicFeilds.area = area;
    if (music_schoolName) musicFeilds.music_schoolName = music_schoolName;
    if (grade) musicFeilds.grade = grade;
    if (email_id) musicFeilds.email_id = email_id;
    if (phone_number) musicFeilds.phone_number = phone_number;
    if (landline_number) musicFeilds.landline_number = landline_number;
    if (min_age) musicFeilds.min_age = min_age;
    if (website) musicFeilds.website = website;
    if (country) musicFeilds.country = country;
    if (state) musicFeilds.state = state;
    if (location) musicFeilds.location = location;
    if (pincode) musicFeilds.pincode = pincode;
    if (address) musicFeilds.address = address;
    if (about_school) musicFeilds.about_school = about_school;
    if (google_location) musicFeilds.google_location = google_location;
    if (music_type) musicFeilds.music_type = music_type;
    if (style) musicFeilds.style = style;
    if (number_of_trainee) musicFeilds.number_of_trainee = number_of_trainee;
    if (timing) musicFeilds.timing = timing;
    if (specification) musicFeilds.specification = specification;
    if (class_frequency) musicFeilds.class_frequency = class_frequency;
    if (establishment_Year) musicFeilds.establishment_Year = establishment_Year;
    if (addmission_fee) musicFeilds.addmission_fee = addmission_fee;

    try {
      let music = await Music.findOne({ vender: req.vender.id });

      if (music) {
        //Update
        music = await Music.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: musicFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: music,
        });
      }

      //Create
      music = new Music(musicFeilds);

      await music.save();

      return res.json({
        status: 1,
        message: 'data added successfully',
        data: music,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/music
//@desc  Get all music
//access  Public

router.get('/', async (req, res) => {
  try {
    const music = await Music.find();
    console.log([music]);
    return res.json({
      status: 1,
      message: 'success',
      data: music,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// get particular data

router.get('/view', (req, res, next) => {
  Music.find()
    .select('music_schoolName   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        music: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            music_schoolName: doc.music_schoolName,
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

//@route GET api/music/vender/vender_id
//@desc  Get music by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const music = await Music.findOne({
      vender: req.params.vender_id,
    });

    if (!music)
      return res.status(400).json({ status: 0, msg: 'Data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: music,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'Data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route GET api/find/:query
//@desc  Search music by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Music.find(
    {
      location: query,
    },
    function (err, music) {
      if (err) throw err;
      if (music) {
        res.json(music);
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

//@route GET api/music_type/:query
//@desc  Search dance by music_type
//access  Public

router.get('/music_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  Music.find(
    {
      music_type: query,
    },
    function (err, music) {
      if (err) throw err;
      if (music) {
        res.json(music);
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

//@route GET api/style/:query
//@desc  Search music by style
//access  Public

router.get('/style/:query', cors(), function (req, res) {
  var query = req.params.query;

  Music.find(
    {
      style: query,
    },
    function (err, music) {
      if (err) throw err;
      if (music) {
        res.json(music);
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
//@desc  Search music by class_frequency
//access  Public

router.get('/class_frequency/:query', cors(), function (req, res) {
  var query = req.params.query;

  Music.find(
    {
      class_frequency: query,
    },
    function (err, music) {
      if (err) throw err;
      if (music) {
        res.json(music);
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
