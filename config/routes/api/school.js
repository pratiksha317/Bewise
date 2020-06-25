const express = require('express');
const config = require('config');
const cors = require('cors');
const router = express.Router();
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');

const { check, validationResult } = require('express-validator');
var multer = require('multer');
const mysql = require('../../../config/db');

//@route GET api/school
//@desc  Get all school
//access  Public

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM bw_schools';
  let query = mysql.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    // res.send(JSON.stringify({ status: 200, error: null, response: results }));
    return res.json({
      status: 1,
      message: 'success',
      data: results,
    });
  });
});

//@route GET api/school/vender/vender_id
//@desc  Get school by Vender Id
//access  Public

router.get('/vender/:id', (req, res) => {
  let sql = 'SELECT * FROM bw_schools WHERE id=' + req.params.id;
  let query = mysql.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    return res.json({
      status: 1,
      message: 'success',
      data: results,
    });
  });
});

//@route GET api/school/views
//@desc  Get selected School data
//access  Public

router.get('/views', (req, res) => {
  let sql =
    'SELECT organisation_name, sub_categories,email_id,phone_number,location FROM bw_schools';
  let query = mysql.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    return res.json({
      status: 1,
      message: 'success',
      data: results,
    });
  });
});

module.exports = router;
