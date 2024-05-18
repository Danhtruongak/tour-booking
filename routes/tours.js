//routes/tour
const express = require("express");
const router = express.Router();
const tourController = require("./../controllers/tours");
const authController = require("./../controllers/auth");
router
  .route("/")
  //protect this route
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
