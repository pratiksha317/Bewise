const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Sports = require('../../../models/Sports');
const { check, validationResult } = require('express-validator');
var multer = require('multer');
// var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage({
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

//@route GET api/sports
//@desc  Create or Update sports
//access  Private

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('owner_name', 'owner_name is required').not().isEmpty(),
      check('academy_name', 'academy_name is required').not().isEmpty(),
      check('sports_type', 'sports_type is required').not().isEmpty(),
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
      check('about_sports', 'about_sports is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('sports', 'sports is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('number_of_coach', 'number_of_coach is required').not().isEmpty(),
      check('timing', 'timing is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),
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
      owner_name,
      academy_name,
      sports_type,
      email_id,
      class_frequency,
      phone_number,
      landline_number,
      fax_number,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about_sports,
      google_location,
      sports,
      grade,
      number_of_coach,
      timing,
      establishment_Year,
      avg_anual_fee,
      addmission_fee,
    } = req.body;

    // Build sports Object
    const sportsFeilds = {};
    sportsFeilds.vender = req.vender.id;

    if (area) sportsFeilds.area = area;
    if (owner_name) sportsFeilds.owner_name = owner_name;
    if (academy_name) sportsFeilds.academy_name = academy_name;
    if (sports_type) sportsFeilds.sports_type = sports_type;
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
    if (about_sports) sportsFeilds.about_sports = about_sports;
    if (google_location) sportsFeilds.google_location = google_location;
    if (sports) sportsFeilds.sports = sports;
    if (grade) sportsFeilds.grade = grade;
    if (number_of_coach) sportsFeilds.number_of_coach = number_of_coach;
    if (timing) sportsFeilds.timing = timing;
    if (establishment_Year)
      sportsFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) sportsFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) sportsFeilds.addmission_fee = addmission_fee;

    try {
      let sports = await Sports.findOne({ vender: req.vender.id });

      if (sports) {
        //Update
        sports = await Sports.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: sportsFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: sports,
        });
      }

      //Create
      sports = new Sports(sportsFeilds);

      await sports.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: sports,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/sports
//@desc  Get all sports
//access  Public

router.get('/', async (req, res) => {
  try {
    const sports = await Sports.find();
    console.log([sports]);
    return res.json({
      status: 1,
      message: 'success',
      data: sports,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/sports/vender/vender_id
//@desc  Get sports by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const sports = await Sports.findOne({
      vender: req.params.vender_id,
    });

    if (!sports)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: sports,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

//@route GET api/find/:query
//@desc  Search sports by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Sports.find(
    {
      location: query,
    },
    function (err, sports) {
      if (err) throw err;
      if (sports) {
        res.json(sports);
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

// get particular data

router.get('/view', (req, res, next) => {
  Sports.find()
    .select('academy_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        sports: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            academy_name: doc.academy_name,
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

//@route GET api/find/:query
//@desc  filter sports by sports_type
//access  Public

router.get('/sports_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  Sports.find(
    {
      sports_type: query,
    },
    function (err, sports) {
      if (err) throw err;
      if (sports) {
        res.json(sports);
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
//@desc  filter sports by sports_type
//access  Public

router.get('/class_frequency/:query', cors(), function (req, res) {
  var query = req.params.query;

  Sports.find(
    {
      class_frequency: query,
    },
    function (err, sports) {
      if (err) throw err;
      if (sports) {
        res.json(sports);
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
//@desc  filter sports by sports_type
//access  Public

router.get('/sports/:query', cors(), function (req, res) {
  var query = req.params.query;

  Sports.find(
    {
      sports: query,
    },
    function (err, sports) {
      if (err) throw err;
      if (sports) {
        res.json(sports);
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
