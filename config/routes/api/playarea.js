const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Playarea = require('../../../models/Playarea');
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

//@route POST api/playarea
//desc Create or update playarea data
//@access Public

router.post(
  '/',
  upload.single('images'),
  [
    auth,
    [
      check('area', 'area is required').not().isEmpty(),
      check('type_of_playarea', 'type_of_playarea is required').not().isEmpty(),
      check('playarea_name', 'playarea_name is required').not().isEmpty(),
      check('age_group', 'age_group is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('about_playarea', 'about_playarea is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('price_per_hour', 'price_per_hour is required').not().isEmpty(),
      check('no_of_support_staff', 'no_of_support_staff is required')
        .not()
        .isEmpty(),
      check('entry_fee', 'entry_fee is required').not().isEmpty(),
      check('weekday_rate', 'weekday_rate is required').not().isEmpty(),
      check('weekend_rate', 'weekend_rate is required').not().isEmpty(),
      check('packages', 'packages is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('pin_code', 'pin_code is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      area,
      type_of_playarea,
      playarea_name,
      age_group,
      phone_number,
      website,
      about_playarea,
      email_id,
      price_per_hour,
      no_of_support_staff,
      entry_fee,
      weekday_rate,
      weekend_rate,
      offers,
      packages,
      facilities,
      bonus_features,
      book_requirements,
      food,
      music,
      screen,
      kids_friendly,
      products_and_service_offered,
      branches,
      country,
      state,
      google_location,
      location,
      pin_code,
    } = req.body;
    images = req.file.path;

    // Build Playarea Object
    const playareaFeild = {};
    playareaFeild.vender = req.vender.id;
    if (area) playareaFeild.area = area;
    if (type_of_playarea) playareaFeild.type_of_playarea = type_of_playarea;
    if (playarea_name) playareaFeild.playarea_name = playarea_name;
    if (age_group) playareaFeild.age_group = age_group;
    if (phone_number) playareaFeild.phone_number = phone_number;
    if (website) playareaFeild.website = website;
    if (about_playarea) playareaFeild.about_playarea = about_playarea;
    if (email_id) playareaFeild.email_id = email_id;
    if (price_per_hour) playareaFeild.price_per_hour = price_per_hour;
    if (no_of_support_staff)
      playareaFeild.no_of_support_staff = no_of_support_staff;
    if (entry_fee) playareaFeild.entry_fee = entry_fee;
    if (weekday_rate) playareaFeild.weekday_rate = weekday_rate;
    if (weekend_rate) playareaFeild.weekend_rate = weekend_rate;
    if (offers) playareaFeild.offers = offers;
    if (packages) playareaFeild.packages = packages;
    if (facilities) playareaFeild.facilities = facilities;
    if (bonus_features) playareaFeild.bonus_features = bonus_features;
    if (book_requirements) playareaFeild.book_requirements = book_requirements;
    if (food) playareaFeild.food = food;
    if (music) playareaFeild.music = music;
    if (screen) playareaFeild.screen = screen;
    if (kids_friendly) playareaFeild.kids_friendly = kids_friendly;
    if (products_and_service_offered)
      playareaFeild.products_and_service_offered = products_and_service_offered;
    if (branches) playareaFeild.branches = branches;
    if (country) playareaFeild.country = country;
    if (state) playareaFeild.state = state;
    if (google_location) playareaFeild.google_location = google_location;
    if (location) playareaFeild.location = location;
    if (pin_code) playareaFeild.pin_code = pin_code;
    if (images) playareaFeild.images = images;

    try {
      let playarea = await Playarea.findOne({ _id: req.vender.id });

      // if (playarea) {
      //   //Update
      //   playarea = await Playarea.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: playareaFeild },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'Data updated successfully',
      //     data: playarea,
      //   });
      // }

      //Create
      playarea = new Playarea(playareaFeild);

      await playarea.save();
      return res.json({
        status: 1,
        message: 'Data added successfully',
        data: playarea,
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
    const playarea = await Playarea.find();

    console.log([playarea]);
    return res.json({
      status: 1,
      message: 'success',
      data: playarea,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;

//get particular data

router.get('/view', (req, res, next) => {
  Playarea.find()
    .select('playarea_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        playarea: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            playarea_name: doc.playarea_name,
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
    const playarea = await Playarea.findOne({
      _id: req.params.vender_id,
    });

    if (!playarea)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: playarea,
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

  Playarea.find(
    {
      city: query,
    },
    function (err, playarea) {
      if (err) throw err;
      if (playarea) {
        res.json({ status: 1, message: 'success', data: playarea });
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
//@desc  sort playarea by type_of_playarea
//access  Public

router.get('/type_of_playarea/:query', cors(), function (req, res) {
  var query = req.params.query;

  Playarea.find(
    {
      type_of_playarea: query,
    },
    function (err, playarea) {
      if (err) throw err;
      if (playarea) {
        res.json({ status: 1, message: 'success', data: playarea });
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
//@desc  sort playarea by facilities
//access  Public

router.get('/facilities/:query', cors(), function (req, res) {
  var query = req.params.query;

  Playarea.find(
    {
      facilities: query,
    },
    function (err, playarea) {
      if (err) throw err;
      if (playarea) {
        res.json({ status: 1, message: 'success', data: playarea });
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
