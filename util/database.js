const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
  }
);

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(`DB connected`.cyan.underline.bold);
  } catch (error) {
    console.error('Unable to connect to the database:'.red.bold, error);
  }
};

checkConnection();

module.exports = sequelize;