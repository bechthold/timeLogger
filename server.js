require('dotenv').config();
const express = require('express');
const sequelize = require('./util/database');
const morgan = require('morgan');
const colors = require('colors');
const {errorHandler} = require('./middlewares/errorHandler');


// Import models
const User = require('./models/User');

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Route files
const users = require('./routes/users');

// Mount routers
app.use(users);

const PORT = process.env.PORT || 8080;

app.use(errorHandler);

// Relations

const sync = async () => await sequelize.sync({force: true});

sync().then(() => {
  User.create({
    email: 'test1@test.com',
    username: 'test1',
    password: '123456'
  });
  User.create({
    email: 'test2@test.com',
    username: 'test2',
    password: '123456'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});


















