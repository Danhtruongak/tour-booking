const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();
const auth = require("../daos/auth");

////Mounting a router /tour routes/////////////////////////

router
  .route("/")
  .get(auth.protect, toursDAOS.getAllTours)
  .post(toursDAOS.createTour);
router
  .route("/:id")
  .get(toursDAOS.getTour)
  .patch(toursDAOS.updateTour)
  .delete(auth.protect, auth.restrictTo("admin"), toursDAOS.deleteTour);

module.exports = router;
