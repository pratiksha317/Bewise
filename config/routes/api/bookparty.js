const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const Bookparty = require('../../../models/Bookparty');
const upload = require('../../../middleware/upload');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route POST api/camps
//desc Create or update camps data
//@access Public

router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required').not().isEmpty(),
      check('mobile_number', 'mobile_number is required').not().isEmpty(),
      check('date', 'date is required').not().isEmpty(),
      check('from_time', 'from_time is required').not().isEmpty(),
      check('to_time', 'to_time is required').not().isEmpty(),
      check('addinitional_features', 'addinitional_features is required')
        .not()
        .isEmpty(),
      check('vender', 'vender is required').not().isEmpty(),
      check('quantity', 'quantity is required').not().isEmpty(),
      check('flavour', 'flavour is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      mobile_number,
      date,
      from_time,
      to_time,
      addinitional_features,
      vender,
      quantity,
      flavour,
    } = req.body;

    // Build Playarea Object
    const bookpartyFeild = {};
    bookpartyFeild.vender = req.vender.id;
    if (name) bookpartyFeild.name = name;
    if (mobile_number) bookpartyFeild.mobile_number = mobile_number;
    if (date) bookpartyFeild.date = date;
    if (from_time) bookpartyFeild.from_time = from_time;

    if (to_time) bookpartyFeild.to_time = to_time;
    if (addinitional_features)
      bookpartyFeild.addinitional_features = addinitional_features;
    if (vender) bookpartyFeild.vender = vender;
    if (quantity) bookpartyFeild.quantity = quantity;
    if (flavour) bookpartyFeild.flavour = flavour;

    try {
      let bookparty = await Bookparty.findOne({ _id: req.vender.id });

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
      bookparty = new Bookparty(bookpartyFeild);

      await bookparty.save();
      return res.json({
        status: 1,
        message: 'Booked successfully',
        data: bookparty,
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
    const camps = await Camps.find();

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

// get particular data

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

//@route GET api/playarea/vender/vender_id
//@desc  Get playarea by vender Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const camps = await Camps.findOne({
      _id: req.params.vender_id,
    });

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
//@desc  sort playarea by city
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
