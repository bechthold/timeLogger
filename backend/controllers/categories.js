const {where} = require('sequelize');
const asyncHandler = require('../middlewares/asyncHandler');
const Category = require('../models/Category');
const User = require('../models/User');
const ErrorResponse = require('../util/errorResponse');

module.exports.getCategories = asyncHandler(async (req, res, next) => {
  const userId = req.loggedUser.id;

  const categories = await Category.findAll({
    where: {
      user_id: userId
    }
  });

  res.status(200).json({categories});
});


module.exports.createCategory = asyncHandler(async (req, res, next) => {
  const {name, icon} = req.body.category;

  fieldValidation(name, next);

  const userId = req.loggedUser.id;

  const category = await Category.create({
    name: name,
    icon: icon,
    user_id: userId
  });

  res.status(201).json({category});
});

module.exports.updateCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const {name, icon} = req.body.category;

  fieldValidation(name, next);

  const category = await Category.findByPk(categoryId);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id = ${categoryId}`));
  }

  await category.update({
    name: name,
    icon: icon
  });

  res.status(200).json({category});
});

module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;

  const category = await Category.findByPk(categoryId);

  if (!category) {
    return next(new ErrorResponse(`Category not found with id = ${categoryId}`));
  }

  await category.destroy();
  res.status(200).json({message: 'Category deleted successfully'});
});

module.exports.getCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId, {include: User});

  if (!category) {
    return next(new ErrorResponse(`Category not found`, 404));
  }

  res.status(200).json({category});
});

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};



