const {where} = require('sequelize');
const asyncHandler = require('../middlewares/asyncHandler');
const Category = require('../models/Category');
const User = require('../models/User');
const Timer = require('../models/Timer');
const ErrorResponse = require('../util/errorResponse');

module.exports.getTimers = asyncHandler(async (req, res, next) => {
  const userId = req.loggedUser.id;

  const timers = await Timer.findAll({
    where: {
      user_id: userId
    },
    include: [Category, User]
  });

  res.status(200).json({timers});
});

module.exports.createTimer = asyncHandler(async (req, res, next) => {
  const {category_id, comment} = req.body.timer;

  fieldValidation(category_id, next);

  const userId = req.loggedUser.id;

  const timer = await Timer.create({
    category_id: category_id,
    user_id: userId,
    comment: comment
  });
  res.status(201).json({timer});
});

module.exports.updateTimer = asyncHandler(async (req, res, next) => {
  const timerId = req.params.id;
  const {
    category_id,
    comment,
    start_time,
    finish_time,
    status
  } = req.body.timer;

  const timer = await Timer.findByPk(timerId);

  if (!timer) {
    return next(new ErrorResponse(`Timer not found with id = ${timerId}`));
  }

  await timer.update({
    category_id: category_id,
    comment: comment,
    start_time: start_time,
    finish_time: finish_time,
    status: status
  });

  res.status(200).json({timer});
});


module.exports.deleteTimer = asyncHandler(async (req, res, next) => {
  const timerId = req.params.id;

  const timer = await Timer.findByPk(timerId);

  if (!timer) {
    return next(new ErrorResponse(`Timer not found with id = ${timerId}`));
  }

  await timer.destroy();
  res.status(200).json({message: `Timer deleted successfully`});
});

module.exports.getTimer = asyncHandler(async (req, res, next) => {
  const timerId = req.params.id;
  const timer = await Timer.findByPk(timerId);

  if (!timer) {
    return next(new ErrorResponse(`Timer not found`, 404));
  }

  res.status(200).json({timer});
});

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};