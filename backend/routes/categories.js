const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory
} = require("../controllers/categories");

const {protect} = require("../middlewares/auth")

router.route("/categories")
  .get(protect, getCategories)
  .post(protect, createCategory);

router
  .route("/categories/:id")
  .get(protect, getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory)

module.exports = router;