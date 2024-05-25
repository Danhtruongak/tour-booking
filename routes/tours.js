const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();

////Mounting a router /tour routes/////////////////////////

router.route("/").get(toursDAOS.getAllTours).post(toursDAOS.createTour);
router
  .route("/:id")
  .get(toursDAOS.getTour)
  .patch(toursDAOS.updateTour)
  .delete(toursDAOS.deleteTour);

module.exports = router;
