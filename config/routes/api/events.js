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
    venue_name: req.body.venue_name,
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
    food: req.body.food,
    hall_type: req.body.hall_type,
    hall_capcity: req.body.hall_capcity,
    dinning_capacity: req.body.dinning_capacity,
    car_parking_slot: req.body.car_parking_slot,
    two_parking_slot: req.body.two_parking_slot,
    event_fee: req.body.event_fee,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    est_year: req.body.est_year,
    prod_service: req.body.prod_service,
    mod_payment: req.body.mod_payment,
    po_flov: req.body.po_flov,
    flov: req.body.flov,
    price_range: req.body.price_range,
    status: req.body.status,
    images: 'http:' + '//' + req.hostname + ':' + 5000 + '/' + req.file.path,
  };

  let sql = 'INSERT INTO bw_events SET ?';
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
