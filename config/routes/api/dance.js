const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const Dance = require('../../../models/Dance');
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

//@route GET api/dance
//@desc  Create or Update dance
//access  Private

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('dance_schoolName', 'dance_schoolName is required').not().isEmpty(),
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
      check('dance_type', 'dance_type is required').not().isEmpty(),
      check('sub_type', 'sub_type is required').not().isEmpty(),
      check('number_of_trainee', 'number_of_trainee is required')
        .not()
        .isEmpty(),
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
      dance_schoolName,
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
      dance_type,
      sub_type,
      number_of_trainee,
      timing,
      establishment_Year,
      avg_anual_fee,
      addmission_fee,
    } = req.body;

    // Build dance feild Object
    const danceFeilds = {};
    danceFeilds.vender = req.vender.id;
    if (area) danceFeilds.area = area;
    if (dance_schoolName) danceFeilds.dance_schoolName = dance_schoolName;
    if (email_id) danceFeilds.email_id = email_id;
    if (phone_number) danceFeilds.phone_number = phone_number;
    if (landline_number) danceFeilds.landline_number = landline_number;
    if (min_age) danceFeilds.min_age = min_age;
    if (website) danceFeilds.website = website;
    if (country) danceFeilds.country = country;
    if (state) danceFeilds.state = state;
    if (location) danceFeilds.location = location;
    if (pincode) danceFeilds.pincode = pincode;
    if (address) danceFeilds.address = address;
    if (about_school) danceFeilds.about_school = about_school;
    if (google_location) danceFeilds.google_location = google_location;
    if (dance_type) danceFeilds.dance_type = dance_type;
    if (sub_type) danceFeilds.sub_type = sub_type;
    if (number_of_trainee) danceFeilds.number_of_trainee = number_of_trainee;
    if (timing) danceFeilds.timing = timing;
    if (establishment_Year) danceFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) danceFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) danceFeilds.addmission_fee = addmission_fee;

    try {
      let dance = await Dance.findOne({ vender: req.vender.id });

      if (dance) {
        //Update
        dance = await Dance.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: danceFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: dance,
        });
      }

      //Create
      dance = new Dance(danceFeilds);

      await dance.save();

      return res.json({
        status: 1,
        message: 'data added successfully',
        data: dance,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/dance
//@desc  Get all dance
//access  Public

router.get('/', async (req, res) => {
  try {
    const dance = await Dance.find();
    console.log([dance]);
    return res.json({
      status: 1,
      message: 'success',
      data: dance,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//get particular data

router.get('/view', (req, res, next) => {
  Dance.find()
    .select('dance_schoolName email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        dance: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            dance_schoolName: doc.dance_schoolName,
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

//@route GET api/dance/vender/vender_id
//@desc  Get dance by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const dance = await Dance.findOne({
      vender: req.params.vender_id,
    });

    if (!dance)
      return res.status(400).json({ status: 0, msg: 'Data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: dance,
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
//@desc  Search dance by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Dance.find(
    {
      location: query,
    },
    function (err, dance) {
      if (err) throw err;
      if (dance) {
        res.json(dance);
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

//@route GET api/dance_type/:query
//@desc  Search dance by dance_type
//access  Public

router.get('/dance_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  Dance.find(
    {
      dance_type: query,
    },
    function (err, dance) {
      if (err) throw err;
      if (dance) {
        res.json(dance);
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

//@route GET api/sub_type/:query
//@desc  Search dance by sub_type
//access  Public

router.get('/sub_type/:query', cors(), function (req, res) {
  var query = req.params.query;

  Dance.find(
    {
      sub_type: query,
    },
    function (err, dance) {
      if (err) throw err;
      if (dance) {
        res.json(dance);
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
