const express = require("express");
const router = express.Router();
const {
  getTimers,
  createTimer,
  updateTimer,
  deleteTimer,
  getTimer
} = require("../controllers/timers");

const {protect} = require("../middlewares/auth")

router.route("/timers")
  .get(protect, getTimers)
  .post(protect, createTimer);

router
  .route("/timers/:id")
  .get(protect, getTimer)
  .put(protect, updateTimer)
  .delete(protect, deleteTimer)

module.exports = router;