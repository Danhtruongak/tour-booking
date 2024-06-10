//routes/tour
const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();

router.route("/").get(toursDAOS.getAllTours).post(toursDAOS.createTour);

router.route("/:slug").get(toursDAOS.getTour);

module.exports = router;
