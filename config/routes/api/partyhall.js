const express = require('express');
const config = require('config');
const router = express.Router();
const cors = require('cors');
const auth = require('../../../middleware/auth1');
const upload = require('../../../middleware/upload');
const Vender = require('../../../models/Vender');
const PartyHall = require('../../../models/PartyHall');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

//@route GET api/school
//@desc  Create events
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
      check('area', 'area is required').not().isEmpty(),
      check('incharge_name', 'incharge_name is required').not().isEmpty(),
      check('partyhall_name', 'partyhall_name is required').not().isEmpty(),
      check('type_of_the_party', 'type_of_the_party is required')
        .not()
        .isEmpty(),
      check('email_id', 'email_id is required').not().isEmpty(),
      check('phone_number', 'phone_number is required').not().isEmpty(),
      check('landline_number', 'landline_number is required').not().isEmpty(),
      check('fax_number', 'fax_number is required').not().isEmpty(),
      check('website', 'website is required').not().isEmpty(),
      check('country', 'country is required').not().isEmpty(),
      check('state', 'state year is required').not().isEmpty(),
      check('location', 'location is required').not().isEmpty(),
      check('pincode', 'pincode is required').not().isEmpty(),
      check('address', 'address year is required').not().isEmpty(),
      check('about_partyhall', 'about_partyhall is required').not().isEmpty(),
      check('google_location', 'google_location is required').not().isEmpty(),
      check('number_of_people_in_hall', 'number_of_people_in_hall is required')
        .not()
        .isEmpty(),
      check('weekday_rates', 'weekday_rates is required').not().isEmpty(),
      check('weekend_rates', 'weekend_rates is required').not().isEmpty(),
      check('establishment_Year', 'establishment_Year is required')
        .not()
        .isEmpty(),
      check('avg_cost', 'avg_cost is required').not().isEmpty(),
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
        fileurl.push('http:' + req.hostname + ':' + 5000 + '/' + result.path);
        saveurldb.push(result.path);
      });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      area,
      incharge_name,
      partyhall_name,
      type_of_the_party,
      facilities,
      email_id,
      phone_number,
      landline_number,
      fax_number,
      website,
      country,
      state,
      location,
      pincode,
      address,
      about_partyhall,
      google_location,
      number_of_people_in_hall,
      weekday_rates,
      weekend_rates,
      establishment_Year,
      avg_cost,
    } = req.body;
    images =
      'http:' + req.hostname + ':' + 5000 + '/' + req.files.images[0].path;
    photos = fileurl.join();

    // Build School Object
    const partyFeilds = {};
    partyFeilds.vender = req.vender.id;

    if (area) partyFeilds.area = area;
    if (incharge_name) partyFeilds.incharge_name = incharge_name;
    if (partyhall_name) partyFeilds.partyhall_name = partyhall_name;
    if (type_of_the_party) partyFeilds.type_of_the_party = type_of_the_party;
    if (email_id) partyFeilds.email_id = email_id;
    if (phone_number) partyFeilds.phone_number = phone_number;
    if (landline_number) partyFeilds.landline_number = landline_number;
    if (fax_number) partyFeilds.fax_number = fax_number;
    if (website) partyFeilds.website = website;
    if (country) partyFeilds.country = country;
    if (state) partyFeilds.state = state;
    if (location) partyFeilds.location = location;
    if (pincode) partyFeilds.pincode = pincode;
    if (address) partyFeilds.address = address;
    if (about_partyhall) partyFeilds.about_partyhall = about_partyhall;
    if (google_location) partyFeilds.google_location = google_location;
    if (number_of_people_in_hall)
      partyFeilds.number_of_people_in_hall = number_of_people_in_hall;
    if (weekday_rates) partyFeilds.weekday_rates = weekday_rates;
    if (weekend_rates) partyFeilds.weekend_rates = weekend_rates;
    if (establishment_Year) partyFeilds.establishment_Year = establishment_Year;
    if (facilities) partyFeilds.facilities = facilities;
    if (avg_cost) partyFeilds.avg_cost = avg_cost;
    if (images) partyFeilds.images = images;
    if (photos) partyFeilds.photos = photos;

    try {
      let partyhall = await PartyHall.findOne({ _id: req.vender.id });

      // if (partyhall) {
      //   //Update
      //   partyhall = await PartyHall.findOneAndUpdate(
      //     { vender: req.vender.id },
      //     { $set: partyFeilds },
      //     { new: true }
      //   );

      //   return res.json({
      //     status: 1,
      //     message: 'data updated successfully',
      //     data: partyhall,
      //   });
      // }

      //Create
      partyhall = new PartyHall(partyFeilds);

      await partyhall.save();
      return res.json({
        status: 1,
        message: 'data added successfully',
        data: partyhall,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server Error');
    }
  }
);

//@route GET api/partyhall
//@desc  Get all partyhall
//access  Public

router.get('/', async (req, res) => {
  try {
    const partyhall = await PartyHall.find();
    console.log([partyhall]);
    return res.json({
      status: 1,
      message: 'success',
      data: partyhall,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route GET api/partyhall/view
//@desc  Get all prefered partyhall
//access  Public

router.get('/view', (req, res, next) => {
  PartyHall.find()
    .select('partyhall_name   email_id phone_number location')
    .exec()
    .then((docs) => {
      const response = {
        partyhall: docs.map((doc) => {
          return {
            status: 1,
            message: 'success',
            partyhall_name: doc.camp_name,
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

//@route GET api/partyhall/vender/vender_id
//@desc  Get partyhall by Id
//access  Public

router.get('/vender/:vender_id', async (req, res) => {
  try {
    const partyhall = await PartyHall.findOne({
      _id: req.params.vender_id,
    });

    if (!partyhall)
      return res.status(400).json({ status: 0, msg: 'data not found' });

    return res.json({
      status: 1,
      message: 'success',
      data: partyhall,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'objectId') {
      return res.status(400).json({ status: 0, msg: 'data not found' });
    }
    res.status(500).send('server error');
  }
});

// //@route  DELETE api/partyhall/:_id
// //@desc   Delete  partyhall
// //access  Public

router.delete('/:_id', (req, res, next) => {
  const id = req.params._id;
  PartyHall.remove({ _id: id })
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
//@desc  Search partyhall school by location
//access  Public

router.get('/find/:query', cors(), function (req, res) {
  var query = req.params.query;

  PartyHall.find(
    {
      location: query,
    },
    function (err, partyhall) {
      if (err) throw err;
      if (partyhall) {
        res.json(partyhall);
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
//@desc  Search partyhall  by type of location
//access  Public

router.get('/type_of_the_party/:query', cors(), function (req, res) {
  var query = req.params.query;

  PartyHall.find(
    {
      type_of_the_party: query,
    },
    function (err, partyhall) {
      if (err) throw err;
      if (partyhall) {
        res.json(partyhall);
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
