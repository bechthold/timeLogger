const {DataTypes} = require('sequelize');
const sequelize = require('../util/database');
const User = require('./User');
const Category = require('./Category');

const Timer = sequelize.define(
  'Timer',
  {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    finish_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('started', 'paused', 'finished'),
      allowNull: false,
      defaultValue: 'started',
    }
  },
  {timestamps: false}
);

module.exports = Timer;