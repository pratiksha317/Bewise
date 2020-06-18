const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Camps = require('../../../models/Camps');
const upload = require('../../../middleware/upload');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route POST api/camps
//desc Create or update camps data
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
      check('registration_no', 'registration_no is required').not().isEmpty(),
      check('camp_name', 'camp_name is required').not().isEmpty(),
      check('invities', 'invities is required').not().isEmpty(),
      check('contact_person', 'contact_person is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('facebook', 'facebook is required').not().isEmpty(),
      check('twitter', 'twitter is required').not().isEmpty(),
      check('event_fee', 'event_fee is required').not().isEmpty(),
      check('when', 'when is required').not().isEmpty(),
      check('where', 'where is required').not().isEmpty(),
      check('registeration', 'registeration is required').not().isEmpty(),
      check('about_camp', 'about_camp is required').not().isEmpty(),
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
      invities,
      camp_name,
      contact_person,
      email_id,
      facebook,
      twitter,
      event_fee,
      website,
      when,
      where,
      registeration,
      about_camp,
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

    // Build Camps Object
    const campsFeild = {};
    campsFeild.vender = req.vender.id;
    if (registration_no) campsFeild.registration_no = registration_no;
    if (invities) campsFeild.invities = invities;
    if (camp_name) campsFeild.camp_name = camp_name;
    if (contact_person) campsFeild.contact_person = contact_person;
    if (website) campsFeild.website = website;
    if (about_camp) campsFeild.about_camp = about_camp;
    if (email_id) campsFeild.email_id = email_id;
    if (facebook) campsFeild.facebook = facebook;
    if (twitter) campsFeild.twitter = twitter;
    if (event_fee) campsFeild.event_fee = event_fee;
    if (when) campsFeild.when = when;
    if (where) campsFeild.where = where;
    if (registeration) campsFeild.registeration = registeration;
    if (images) campsFeild.images = images;
    if (photos) campsFeild.photos = photos;

    try {
      let camps = await Camps.findOne({ _id: req.vender.id });

      // if (camps) {
      //   //Update
      //   camps = await Camps.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: campsFeild },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'Data updated successfully',
      //     data: camps,
      //   });
      // }

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

//@route GET api/camps
//@desc  Get all camps
//access  Public

router.get('/', async (req, res) => {
  try {
    const camps = await Camps.find().populate('vender', 'owner_name');

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

//@route GET api/camps/view
//@desc  Get all camps of preffered data
//access  Public

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

//@route GET api/camps/vender/vender_id
//@desc  Get camps by  Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const camps = await Camps.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

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

// //@route  DELETE api/camps/:_id
// //@desc   Delete  camps
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  Camps.remove({ _id: id })
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
//@desc  sort camps by location
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
