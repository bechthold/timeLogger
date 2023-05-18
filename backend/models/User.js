const {DataTypes, Model} = require('sequelize');
const sequelize = require('../util/database');
const bcrypt = require('bcryptjs');

/**
 * "email": "",
 * "token": "",
 * "username": "",
 * "bio: "",
 * "image": ""
 */

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {timestamps: false}
);

Model.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

User.addHook('beforeCreate', async (user) => {
  const encryptedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.DEFAULT_SALT_ROUNDS)
  );
  user.password = encryptedPassword;
});

module.exports = User;
