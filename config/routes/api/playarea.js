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
    organisation_name: req.body.organisation_name,
    sub_categories: req.body.sub_categories,
    email_id: req.body.email_id,
    phone_number: req.body.phone_number,
    land_line: req.body.land_line,
    fax_number: req.body.fax_number,
    state: req.body.state,
    location: req.body.location,
    area: req.body.area,
    address: req.body.address,
    country: req.body.country,
    pincode: req.body.pincode,
    about: req.body.about,
    google_location: req.body.google_location,
    facilites: req.body.facilites,
    opening_time: req.body.opening_time,
    mode_of_payment: req.body.mode_of_payment,
    no_teacher: req.body.no_teacher,
    est_year: req.body.est_year,
    entry_fee: req.body.entry_fee,
    images: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path,
    status: req.body.status,
  };
  let sql = 'INSERT INTO bw_play_area SET ?';
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
