const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Drawing = require('../../../models/Drawing');
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

//@route GET api/drawing
//@desc  Create or Update drawing
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
      check('artist_name', 'artist_name is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country year is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('type_of_drawing', 'type_of_drawing is required').not().isEmpty(),
      check('available_days', 'available_days is required').not().isEmpty(),
      check('number_of_artist', 'number_of_artist is required').not().isEmpty(),
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
      artist_name,
      email_id,
      phone_number,
      landline_number,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about_school,
      google_location,
      type_of_drawing,
      available_days,
      number_of_artist,
      timing,
      establishment_Year,
      avg_anual_fee,
      addmission_fee,
    } = req.body;

    // Build School Object
    const drawFeilds = {};
    drawFeilds.vender = req.vender.id;

    if (organisation_name) drawFeilds.organisation_name = organisation_name;
    if (area) drawFeilds.area = area;
    if (artist_name) drawFeilds.artist_name = artist_name;
    if (email_id) drawFeilds.email_id = email_id;
    if (phone_number) drawFeilds.phone_number = phone_number;
    if (landline_number) drawFeilds.landline_number = landline_number;
    if (website) drawFeilds.website = website;
    if (country) drawFeilds.country = country;
    if (state) drawFeilds.state = state;
    if (location) drawFeilds.location = location;
    if (pincode) drawFeilds.pincode = pincode;
    if (address) drawFeilds.address = address;
    if (about_school) drawFeilds.about_school = about_school;
    if (google_location) drawFeilds.google_location = google_location;
    if (type_of_drawing) drawFeilds.type_of_drawing = type_of_drawing;
    if (available_days) drawFeilds.available_days = available_days;
    if (number_of_artist) drawFeilds.number_of_artist = number_of_artist;
    if (timing) drawFeilds.timing = timing;
    if (establishment_Year) drawFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) drawFeilds.avg_anual_fee = avg_anual_fee;
    if (addmission_fee) drawFeilds.addmission_fee = addmission_fee;

    try {
      let drawing = await Drawing.findOne({ vender: req.vender.id });

      if (drawing) {
        //Update
        drawing = await Drawing.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: drawFeilds },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'data updated successfully',
          data: drawing,
        });
      }

      //Create
      drawing = new Drawing(drawFeilds);

      await drawing.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: drawing,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/drawing
//@desc  Get all drawing
//access  Public

router.get('/', async (req, res) => {
  try {
    const drawing = await Drawing.find();
    console.log([drawing]);
    return res.json({
      status: 1,
      message: 'success',
      data: drawing,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// get particular data

router.get('/view', (req, res, next) => {
  Drawing.find()
    .select('organisation_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        drawing: docs.map((doc) => {
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

//@route GET api/drawing/vender/vender_id
//@desc  Get drawing by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const drawing = await Drawing.findOne({
      vender: req.params.vender_id,
    });

    if (!drawing)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: drawing,
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
//@desc  Search drawing by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Drawing.find(
    {
      location: query,
    },
    function (err, drawing) {
      if (err) throw err;
      if (drawing) {
        res.json(drawing);
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

//@route GET api/available_days/:query
//@desc  Search drawing by available_days
//access  Public

router.get('/available_days/:query', cors(), function (req, res) {
  var query = req.params.query;

  Drawing.find(
    {
      available_days: query,
    },
    function (err, drawing) {
      if (err) throw err;
      if (drawing) {
        res.json(drawing);
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
