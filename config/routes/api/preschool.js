const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Preschool = require('../../../models/Preschool');
const { check, validationResult } = require('express-validator');
var multer = require('multer');

//@route GET api/preschool
//@desc  Create or Update schhol
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
      check('ownerName', 'ownerName is required').not().isEmpty(),
      check('registration_no', 'registeration_number is required')
        .not()
        .isEmpty(),
      check('schoolName', 'SchoolName is required').not().isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country year is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('schoolType', 'schoolType is required').not().isEmpty(),
      check('board_of_education', 'board_of_education is required')
        .not()
        .isEmpty(),
      check('facilities', 'facilities is required').not().isEmpty(),
      check('opening_timimg', 'opening_timimg is required').not().isEmpty(),
      check('number_of_teachers', 'number_of_teachers is required')
        .not()
        .isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_anual_fee', 'mode_of_payment year is required')
        .not()
        .isEmpty(),
      check('other_fee', 'other_fee is required').not().isEmpty(),
      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
      check('admission_link', 'admission_link is required').not().isEmpty(),
      check('processing_fee', 'processing_fee is required').not().isEmpty(),
      check('mode_of_payment', 'mode_of_payment is required').not().isEmpty(),
      check('isrefund', 'isrefund is required').not().isEmpty(),
      check('required_document', 'required_document is required')
        .not()
        .isEmpty(),
      check('admission_process', 'admission_process is required')
        .not()
        .isEmpty(),
      check('address', 'address is required').not().isEmpty(),
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
      ownerName,
      registration_no,
      schoolName,
      email_id,
      phone_number,
      fax_number,
      website,
      country,
      state,
      location,
      pincode,
      about_school,
      google_location,
      schoolType,
      board_of_education,
      facilities,
      opening_timimg,
      number_of_teachers,
      establishment_Year,
      avg_anual_fee,
      other_fee,
      addmission_fee,
      admission_link,
      processing_fee,
      required_document,
      mode_of_payment,
      admission_process,
      isrefund,
      address,
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

    // Build School Object
    const preschoolFeilds = {};
    preschoolFeilds.vender = req.vender.id;

    if (ownerName) preschoolFeilds.ownerName = ownerName;
    if (registration_no) preschoolFeilds.registration_no = registration_no;
    if (schoolName) preschoolFeilds.schoolName = schoolName;
    if (email_id) preschoolFeilds.email_id = email_id;
    if (phone_number) preschoolFeilds.phone_number = phone_number;
    if (fax_number) preschoolFeilds.fax_number = fax_number;
    if (website) preschoolFeilds.website = website;
    if (country) preschoolFeilds.country = country;
    if (state) preschoolFeilds.state = state;
    if (location) preschoolFeilds.location = location;
    if (pincode) preschoolFeilds.pincode = pincode;
    if (about_school) preschoolFeilds.about_school = about_school;
    if (google_location) preschoolFeilds.google_location = google_location;
    if (schoolType) preschoolFeilds.schoolType = schoolType;
    if (board_of_education)
      preschoolFeilds.board_of_education = board_of_education;
    if (facilities) preschoolFeilds.facilities = facilities;
    if (opening_timimg) preschoolFeilds.opening_timimg = opening_timimg;
    if (number_of_teachers)
      preschoolFeilds.number_of_teachers = number_of_teachers;
    if (establishment_Year)
      preschoolFeilds.establishment_Year = establishment_Year;
    if (avg_anual_fee) preschoolFeilds.avg_anual_fee = avg_anual_fee;
    if (other_fee) preschoolFeilds.other_fee = other_fee;
    if (addmission_fee) preschoolFeilds.addmission_fee = addmission_fee;
    if (admission_link) preschoolFeilds.admission_link = admission_link;
    if (processing_fee) preschoolFeilds.processing_fee = processing_fee;
    if (mode_of_payment) preschoolFeilds.mode_of_payment = mode_of_payment;
    if (required_document)
      preschoolFeilds.required_document = required_document;
    if (admission_process)
      preschoolFeilds.admission_process = admission_process;
    if (isrefund) preschoolFeilds.isrefund = isrefund;
    if (address) preschoolFeilds.address = address;
    if (images) preschoolFeilds.images = images;
    if (photos) preschoolFeilds.photos = photos;

    try {
      let preschool = await Preschool.findOne({ _id: req.vender.id });

      // if (preschool) {
      //   //Update
      //   preschool = await Preschool.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: preschoolFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'data updated successfully',
      //     data: preschool,
      //   });
      // }

      //Create
      preschool = new Preschool(preschoolFeilds);

      await preschool.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: preschool,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/preschool
//@desc  Get all Pre school
//access  Public

router.get('/', async (req, res) => {
  try {
    const preschool = await Preschool.find().populate('vender', 'owner_name');
    console.log([preschool]);
    return res.json({
      status: 1,
      message: 'success',
      data: preschool,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//get particular data

router.get('/view', (req, res, next) => {
  Preschool.find()
    .select('schoolName board_of_education  email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        preschool: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            schoolName: doc.schoolName,
            board_of_education: doc.board_of_education,
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

//@route GET api/preschool/vender/vender_id
//@desc  Get preschool by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const preschool = await Preschool.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

    if (!preschool)
      return res.status(400).json({ status: 0, msg: 'data not found' });
    console.log([preschool]);

    return res.json({
      status: 1,
      message: 'success',
      data: preschool,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

// //@route  DELETE api/preschool/:_id
// //@desc   Delete  preschool
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  Preschool.remove({ _id: id })
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
//@desc  Search Yoga school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  Preschool.find(
    {
      location: query,
    },
    function (err, preschool) {
      if (err) throw err;
      if (preschool) {
        console.log([preschool]);
        res.json(preschool);
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
//@desc  sort preschool by type_of_school
//access  Public

router.get('/schoolType/:query', cors(), function (req, res) {
  var query = req.params.query;

  Preschool.find(
    {
      schoolType: query,
    },
    function (err, preschool) {
      if (err) throw err;
      if (preschool) {
        res.json(preschool);
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
//@desc  sort preschool by board_of_education
//access  Public

router.get('/board_of_education/:query', cors(), function (req, res) {
  var query = req.params.query;

  Preschool.find(
    {
      board_of_education: query,
    },
    function (err, preschool) {
      if (err) throw err;
      if (preschool) {
        res.json(preschool);
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
//@desc  sort preschool by board_of_education
//access  Public

router.get('/facilities/:query', cors(), function (req, res) {
  var query = req.params.query;

  Preschool.find(
    {
      facilities: query,
    },
    function (err, preschool) {
      if (err) throw err;
      if (preschool) {
        res.json(preschool);
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
