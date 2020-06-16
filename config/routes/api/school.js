const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const School = require('../../../models/School');
const { check, validationResult } = require('express-validator');
var multer = require('multer');

//@route GET api/school
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
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_school', 'about_school is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('schoolType', 'schoolType is required').not().isEmpty(),
      check('classification', 'classification is required').not().isEmpty(),
      check('board_of_education', 'grade is required').not().isEmpty(),
      check('grade', 'grade is required').not().isEmpty(),
      check('school_timimg', 'school_timimg is required').not().isEmpty(),
      check('mode_of_payment', 'mode_of_payment is required').not().isEmpty(),
      check('min_age', 'min_age is required').not().isEmpty(),
      check('instruction_lang', 'instruction_lang is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('facilities', 'facilities is required').not().isEmpty(),
      check('avg_anual_fee', 'avg_anual_fee is required').not().isEmpty(),
      check('other_fee', 'other_fee is required').not().isEmpty(),
      check('addmission_fee', 'addmission_fee is required').not().isEmpty(),
      check('admission_link', 'admission_link is required').not().isEmpty(),
      check('processing_fee', 'processing_fee is required').not().isEmpty(),
      check('required_document', 'required_document is required')
        .not()
        .isEmpty(),
      check('admission_process', 'admission_process is required')
        .not()
        .isEmpty(),
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
    console.log(req.file);
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
      landline_number,
      fax_number,
      website,
      state,
      location,
      pincode,
      address,
      about_school,
      google_location,
      schoolType,
      classification,
      board_of_education,
      grade,
      school_timimg,
      mode_of_payment,
      min_age,
      instruction_lang,
      establishment_Year,
      facilities,
      avg_anual_fee,
      other_fee,
      addmission_fee,
      is_refundable,
      admission_link,
      processing_fee,
      required_document,
      admission_process,
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
    const schoolFeilds = {};
    schoolFeilds.vender = req.vender.id;

    if (ownerName) schoolFeilds.ownerName = ownerName;
    if (registration_no) schoolFeilds.registration_no = registration_no;
    if (schoolName) schoolFeilds.schoolName = schoolName;
    if (email_id) schoolFeilds.email_id = email_id;
    if (phone_number) schoolFeilds.phone_number = phone_number;
    if (landline_number) schoolFeilds.landline_number = landline_number;
    if (fax_number) schoolFeilds.fax_number = fax_number;
    if (website) schoolFeilds.website = website;
    if (state) schoolFeilds.state = state;
    if (location) schoolFeilds.location = location;
    if (pincode) schoolFeilds.pincode = pincode;
    if (address) schoolFeilds.address = address;
    if (about_school) schoolFeilds.about_school = about_school;
    if (google_location) schoolFeilds.google_location = google_location;
    if (schoolType) schoolFeilds.schoolType = schoolType;
    if (classification) schoolFeilds.classification = classification;
    if (board_of_education)
      schoolFeilds.board_of_education = board_of_education;
    if (grade) schoolFeilds.grade = grade;
    if (school_timimg) schoolFeilds.school_timimg = school_timimg;
    if (mode_of_payment) schoolFeilds.mode_of_payment = mode_of_payment;
    if (min_age) schoolFeilds.min_age = min_age;
    if (instruction_lang) schoolFeilds.instruction_lang = instruction_lang;
    if (establishment_Year)
      schoolFeilds.establishment_Year = establishment_Year;
    if (facilities) schoolFeilds.facilities = facilities;
    if (avg_anual_fee) schoolFeilds.avg_anual_fee = avg_anual_fee;
    if (other_fee) schoolFeilds.other_fee = other_fee;
    if (addmission_fee) schoolFeilds.addmission_fee = addmission_fee;
    if (is_refundable) schoolFeilds.is_refundable = is_refundable;
    if (admission_link) schoolFeilds.admission_link = admission_link;
    if (processing_fee) schoolFeilds.processing_fee = processing_fee;
    if (required_document) schoolFeilds.required_document = required_document;
    if (admission_process) schoolFeilds.admission_process = admission_process;
    if (images) schoolFeilds.images = images;
    if (photos) schoolFeilds.photos = photos;

    schoolFeilds.gallery = {};
    if (photos) profileFields.gallery.photos = photos;

    try {
      let school = await School.findOne({ _id: req.vender.id });

      // if (school) {
      //   //Update
      //   school = await School.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: schoolFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'Data updated successfully',
      //     data: school,
      //   });
      // }

      //Create
      school = new School(schoolFeilds);

      await school.save();
      return res.json({
        status: 1,
        message: 'Data added successfully',
        data: school,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/school
//@desc  Get all school
//access  Public

router.get('/', async (req, res) => {
  try {
    const school = await School.find().populate('vender', 'owner_name');
    return res.json({
      status: 1,
      message: 'success',
      data: school,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//get particular data

router.get('/view', (req, res, next) => {
  School.find()
    .select('schoolName board_of_education  email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        school: docs.map((doc) => {
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

//@route GET api/school/vender/vender_id
//@desc  Get school by Vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const school = await School.findOne({
      _id: req.params.vender_id,
    }).populate('vender', 'owner_name');

    if (!school)
      return res.status(400).json({ status: 0, msg: 'data not found' });
    console.log([school]);

    return res.json({
      status: 1,
      message: 'success',
      data: school,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});
// //@route  DELETE api/school/:_id
// //@desc   Delete  school
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  School.remove({ _id: id })
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
//@desc  Search  school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      location: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        console.log([school]);
        res.json(school);
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
//@desc  Search  school by School Type
//access  Public

router.get('/filter/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      schoolType: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json(school);
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
//@desc  Search school by board_of_education
//access  Public

router.get('/filter_by_board/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      board_of_education: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json(school);
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
//@desc  Search school by classification
//access  Public

router.get('/facilities/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      facilities: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json({ status: 1, message: 'success', data: school });
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
//@desc  Search school by aminities
//access  Public

router.get('/filter_by_classification/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      classification: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json(school);
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
//@desc  Search school by avg_anual_fee
//access  Public

router.get('/filter_by_fees/:query', cors(), function (req, res) {
  var query = req.params.query;

  School.find(
    {
      avg_anual_fee: query,
    },
    function (err, school) {
      if (err) throw err;
      if (school) {
        res.json(school);
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
