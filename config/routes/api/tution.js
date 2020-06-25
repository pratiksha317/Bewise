const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const multer = require('multer');
const mysql = require('../../../config/db');

//@route POST api/preschool
//@desc  Add  school Data
//access  Public

router.post('/', upload.single('images'), (req, res) => {
  let data = {
    registration_no: req.body.registration_no,
    owner_name: req.body.owner_name,
    tution_name: req.body.tution_name,
    incharge_name: req.body.incharge_name,
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
    tution_type: req.body.tution_type,
    bof: req.body.bof,
    class_range: req.body.class_range,
    languages: req.body.languages,
    class_freq: req.body.class_freq,
    est_year: req.body.est_year,
    opening_time: req.body.opening_time,
    no_teacher: req.body.no_teacher,
    avg_fee: req.body.avg_fee,
    admit_fee: req.body.admit_fee,
    images: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path,
    status: req.body.status,
  };
  let sql = 'INSERT INTO bw_tutions SET ?';
  let query = mysql.query(sql, data, (err, results) => {
    if (err) throw err;
    return res.json({
      status: 1,
      message: 'success',
      data: results,
    });
  });
});

module.exports = router;
