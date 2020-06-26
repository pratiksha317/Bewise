const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const multer = require('multer');
const mysql = require('../../../config/db');

//@route POST api/preschool
//@desc  Add  school Datas
//access  Public

router.post('/', upload.single('images'), (req, res) => {
  let data = {
    registration_no: req.body.registration_no,
    owner_name: req.body.owner_name,
    organisation_name: req.body.organisation_name,
    sub_categories: req.body.sub_categories,
    email_id: req.body.email_id,
    phone_number: req.body.phone_number,
    fax_number: req.body.fax_number,
    state: req.body.state,
    location: req.body.location,
    address: req.body.address,
    country: req.body.country,
    pincode: req.body.pincode,
    about: req.body.about,
    google_location: req.body.google_location,
    school_type: req.body.school_type,
    edu_type: req.body.edu_type,
    grade_from: req.body.grade_from,
    grade_to: req.body.grade_to,
    timing: req.body.timing,
    paymnet: req.body.paymnet,
    min_age: req.body.min_age,
    language: req.body.language,
    est_year: req.body.est_year,
    amenities: req.body.amenities,
    avg_fee: req.body.avg_fee,
    other_fee: req.body.other_fee,
    admit_fee: req.body.admit_fee,
    is_refund: req.body.is_refund,
    images: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path,
    photos: req.body.photos,
    status: req.body.status,
  };
  let sql = 'INSERT INTO bw_pre_schools SET ?';
  let query = mysql.query(sql, data, (err, results) => {
    console.log(req.file);

    if (err) throw err;
    return res.json({
      status: 1,
      message: 'success',
      data: results,
    });
  });
});

module.exports = router;
