const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Playarea = require('../../../models/Playarea');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route POST api/playarea
//desc Create or update playarea data
//@access Public

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
      check('playarea_name', 'playarea_name is required').not().isEmpty(),
      check('age_group', 'age_group is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('about_playarea', 'about_playarea is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('no_of_support_staff', 'no_of_support_staff is required')
        .not()
        .isEmpty(),
      check('entry_fee', 'entry_fee is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('pin_code', 'pin_code is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('modeofpayment', 'modeofpayment is required').not().isEmpty(),
      check('address', 'address is required').not().isEmpty(),
      check('establishment_year', 'establishment_year is required')
        .not()
        .isEmpty(),
      check('timing', 'timing is required').not().isEmpty(),
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
      area,
      registration_no,
      ownerName,
      playarea_name,
      age_group,
      phone_number,
      website,
      about_playarea,
      email_id,
      no_of_support_staff,
      entry_fee,
      facilities,
      country,
      state,
      google_location,
      location,
      pin_code,
      landline_number,
      fax_number,
      modeofpayment,
      establishment_year,
      address,
      timing,
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

    // Build Playarea Object
    const playareaFeild = {};
    playareaFeild.vender = req.vender.id;
    if (area) playareaFeild.area = area;
    if (ownerName) playareaFeild.ownerName = ownerName;
    if (registration_no) playareaFeild.registration_no = registration_no;
    if (playarea_name) playareaFeild.playarea_name = playarea_name;
    if (age_group) playareaFeild.age_group = age_group;
    if (phone_number) playareaFeild.phone_number = phone_number;
    if (website) playareaFeild.website = website;
    if (about_playarea) playareaFeild.about_playarea = about_playarea;
    if (email_id) playareaFeild.email_id = email_id;
    if (no_of_support_staff)
      playareaFeild.no_of_support_staff = no_of_support_staff;
    if (entry_fee) playareaFeild.entry_fee = entry_fee;
    if (facilities) playareaFeild.facilities = facilities;
    if (country) playareaFeild.country = country;
    if (state) playareaFeild.state = state;
    if (google_location) playareaFeild.google_location = google_location;
    if (location) playareaFeild.location = location;
    if (pin_code) playareaFeild.pin_code = pin_code;
    if (landline_number) playareaFeild.landline_number = landline_number;
    if (fax_number) playareaFeild.fax_number = fax_number;
    if (address) playareaFeild.address = address;
    if (modeofpayment) playareaFeild.modeofpayment = modeofpayment;
    if (establishment_year)
      playareaFeild.establishment_year = establishment_year;
    if (timing) playareaFeild.timing = timing;
    if (images) playareaFeild.images = images;
    if (photos) playareaFeild.photos = photos;

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
    const playarea = await Playarea.find().populate('vender', 'owner_name');

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
    }).populate('vender', 'owner_name');

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

// //@route  DELETE api/playarea/:_id
// //@desc   Delete  playarea
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  Playarea.remove({ _id: id })
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
//@desc  sort playarea by city
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Playarea.find(
    {
      location: query,
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

//@route GET api/age_group
//@desc  Filter playarea by age_gropup
//access  Public

router.get('/age_group/:query', cors(), function (req, res) {
  var query = req.params.query;

  Playarea.find(
    {
      age_group: query,
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
