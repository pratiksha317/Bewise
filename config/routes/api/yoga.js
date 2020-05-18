const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Yoga = require('../../../models/Yoga');
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

//@route GET api/yoga
//@desc  Create or Update yoga
//access  Private

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('organisation_name', 'organisation_name is required')
        .not()
        .isEmpty(),
      check('trainee_name', 'trainee_name is required').not().isEmpty(),
      check('gender', 'gender is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_yoga', 'about_yoga is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('type_of_yoga', 'type_of_yoga is required').not().isEmpty(),
      check('available_days', 'available_days is required').not().isEmpty(),
      check('min_Age', 'min_Age is required').not().isEmpty(),
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
      organisation_name,
      trainee_name,
      gender,
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
      about_yoga,
      google_location,
      type_of_yoga,
      available_days,
      min_Age,
      number_of_trainee,
      timing,
      establishment_Year,
      avg_anual_fee,
      addmission_fee,
    } = req.body;

    // Build yogaFeilds Object
    const yogaFeilds = {};
    yogaFeilds.vender = req.vender.id;

    if (area) yogaFeilds.area = area;
    if (organisation_name) yogaFeilds.organisation_name = organisation_name;
    if (trainee_name) yogaFeilds.trainee_name = trainee_name;
    if (gender) yogaFeilds.gender = gender;
    if (email_id) yogaFeilds.email_id = email_id;
    if (phone_number) yogaFeilds.phone_number = phone_number;
    if (landline_number) yogaFeilds.landline_number = landline_number;
    if (fax_number) yogaFeilds.fax_number = fax_number;
    if (website) yogaFeilds.website = website;
    if (country) yogaFeilds.country = country;
    if (state) yogaFeilds.state = state;
    if (location) yogaFeilds.location = location;
    if (pincode) yogaFeilds.pincode = pincode;
    if (address) yogaFeilds.address = address;
    if (about_yoga) yogaFeilds.about_yoga = about_yoga;
    if (google_location) yogaFeilds.google_location = google_location;
    if (type_of_yoga) yogaFeilds.type_of_yoga = type_of_yoga;
    if (available_days) yogaFeilds.available_days = available_days;
    if (min_Age) yogaFeilds.min_Age = min_Age;
    if (number_of_trainee) yogaFeilds.number_of_trainee = number_of_trainee;
    if (timing) yogaFeilds.timing = timing;
    if (establishment_Year) yogaFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) yogaFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) yogaFeilds.addmission_fee = addmission_fee;

    try {
      let yoga = await Yoga.findOne({ vender: req.vender.id });

      if (yoga) {
        //Update
        yoga = await Yoga.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: yogaFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'Yoga data updated successfully',
          data: yoga,
        });
      }

      //Create
      yoga = new Yoga(yogaFeilds);

      await yoga.save();
      res.json({
        status: 1,
        message: 'Yoga data added successfully',
        data: yoga,
      });
      // res.json(yoga);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/yoga
//@desc  Get all yoga
//access  Public

router.get('/', async (req, res) => {
  try {
    const yoga = await Yoga.find();
    console.log([yoga]);
    return res.json({
      status: 1,
      message: 'success',
      data: yoga,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// get particular data

router.get('/view', (req, res, next) => {
  Yoga.find()
    .select('organisation_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        yoga: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            organisation_name: doc.organisation_name,
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

//@route GET api/yoga/vender/vender_id
//@desc  Get yoga by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const yoga = await Yoga.findOne({
      vender: req.params.vender_id,
    });

    if (!yoga)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: yoga,
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
//@desc  Search Yoga school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Yoga.find(
    {
      location: query,
    },
    function (err, yoga) {
      if (err) throw err;
      if (yoga) {
        res.json(yoga);
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
