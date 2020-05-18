const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Camps = require('../../../models/Camps');
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

//@route POST api/camps
//desc Create or update camps data
//@access Public

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('period', 'period is required').not().isEmpty(),
      check('camp_name', 'camp_name is required').not().isEmpty(),
      check('type_of_the_camps', 'type_of_the_camps is required')
        .not()
        .isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('weekday_rate', 'weekday_rate is required').not().isEmpty(),
      check('weekend_rate', 'weekend_rate is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('about_camp', 'about_camp is required').not().isEmpty(),
      check('timing', 'timing is required').not().isEmpty(),
      check('avg_cost', 'avg_cost is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      area,
      period,
      camp_name,
      type_of_the_camps,
      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      country,
      state,
      weekday_rate,
      weekend_rate,
      about_camp,
      google_location,
      location,
      pincode,
      timing,
      avg_cost,
    } = req.body;

    // Build Playarea Object
    const campsFeild = {};
    campsFeild.vender = req.vender.id;
    if (area) campsFeild.area = area;
    if (period) campsFeild.period = period;
    if (camp_name) campsFeild.camp_name = camp_name;
    if (type_of_the_camps) campsFeild.type_of_the_camps = type_of_the_camps;

    if (phone_number) campsFeild.phone_number = phone_number;
    if (website) campsFeild.website = website;
    if (about_camp) campsFeild.about_camp = about_camp;
    if (email_id) campsFeild.email_id = email_id;
    if (landline_number) campsFeild.landline_number = landline_number;
    if (fax_number) campsFeild.fax_number = fax_number;

    if (timing) campsFeild.timing = timing;
    if (weekday_rate) campsFeild.weekday_rate = weekday_rate;
    if (weekend_rate) campsFeild.weekend_rate = weekend_rate;
    if (avg_cost) campsFeild.avg_cost = avg_cost;

    if (country) campsFeild.country = country;
    if (state) campsFeild.state = state;
    if (google_location) campsFeild.google_location = google_location;
    if (location) campsFeild.location = location;
    if (pincode) campsFeild.pincode = pincode;

    try {
      let camps = await Camps.findOne({ vender: req.vender.id });

      if (camps) {
        //Update
        camps = await Camps.findOneAndUpdate(
          { vender: req.vender.id },
          { $set: campsFeild },
          { new: true }
        );

        return res.json({
          status: 1,
          message: 'Data updated successfully',
          data: camps,
        });
      }

      //Create
      camps = new Camps(campsFeild);

      await camps.save();
      return res.json({
        status: 1,
        message: 'Data added successfully',
        data: camps,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/playarea
//@desc  Get all playareas
//access  Public

router.get('/', async (req, res) => {
  try {
    const camps = await Camps.find();

    console.log([camps]);
    return res.json({
      status: 1,
      message: 'success',
      data: camps,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

// get particular data

router.get('/view', (req, res, next) => {
  Camps.find()
    .select('camp_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        camps: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            camp_name: doc.camp_name,
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

//@route GET api/playarea/vender/vender_id
//@desc  Get playarea by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const camps = await Camps.findOne({
      vender: req.params.vender_id,
    });

    if (!camps)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: camps,
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
//@desc  sort playarea by city
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Camps.find(
    {
      location: query,
    },
    function (err, camps) {
      if (err) throw err;
      if (camps) {
        res.json({ status: 1, message: 'success', data: camps });
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
