const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();
const authDAOS = require("../daos/auth");

////Mounting a router /tour routes/////////////////////////

router.route("/").get(toursDAOS.getAllTours).post(toursDAOS.createTour);
router.get("/search", toursDAOS.searchTours);
router
  .route("/:id")
  .get(toursDAOS.getTour)
  .patch(toursDAOS.updateTour)
  .delete(authDAOS.protect, authDAOS.restrictTo("admin"), toursDAOS.deleteTour);

module.exports = router;
