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
    camp_name: req.body.camp_name,
    contact_person: req.body.contact_person,
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
    when_event: req.body.when_event,
    where_event: req.body.where_event,
    register_info: req.body.register_info,
    event_fee: req.body.event_fee,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    images: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path,
    status: req.body.status,
  };
  let sql = 'INSERT INTO bw_sesonal_camp SET ?';
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
