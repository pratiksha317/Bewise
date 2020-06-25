const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const mysqlConnection = require('./config/db');

const app = express();

app.use('/uploads', express.static('uploads'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Use Cors

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-auth-token',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// //Connect DB
// connectDB();

//Initialize Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

//Define Routers
app.use('/api/playarea', require('./config/routes/api/playarea'));
app.use('/api/school', require('./config/routes/api/school'));
app.use('/api/preschool', require('./config/routes/api/preschool'));
app.use('/api/tution', require('./config/routes/api/tution'));
app.use('/api/camps', require('./config/routes/api/camps'));
app.use('/api/events', require('./config/routes/api/events'));
app.use(
  '/api/hobbies_interest',
  require('./config/routes/api/hobbies_interest')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
