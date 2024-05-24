const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();

//param middleware check for id params
router.param("id", toursDAOS.checkID);

////Mounting a router /tour routes/////////////////////////

router.route("/").get(toursDAOS.getAllTours).post(toursDAOS.createTour);
router
  .route("/:id")
  .get(toursDAOS.getTour)
  .patch(toursDAOS.updateTour)
  .delete(toursDAOS.deleteTour);

module.exports = router;
