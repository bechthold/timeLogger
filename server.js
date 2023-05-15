require('dotenv').config();
const express = require('express');
const sequelize = require('./util/database');
const morgan = require('morgan');
const colors = require('colors');
const {errorHandler} = require('./middlewares/errorHandler');


// Import models
const User = require('./models/User');
const Category = require('./models/Category')

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
const categories = require('./routes/categories');

// Mount routers
app.use(users);
app.use(categories);

const PORT = process.env.PORT || 8080;

app.use(errorHandler);

// Relations
User.hasMany(Category, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Category.belongsTo(User, { foreignKey: 'user_id' });

const sync = async () => await sequelize.sync({force: true});

sync().then(async () => {
  await User.create({
    email: 'test1@test.com',
    username: 'test1',
    password: '123456'
  });
  await User.create({
    email: 'test2@test.com',
    username: 'test2',
    password: '123456'
  });

  await Category.create({
    name: 'project1',
    icon: null,
    user_id: 1
  });
  await Category.create({
    name: 'project2',
    icon: null,
    user_id: 1
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});


















