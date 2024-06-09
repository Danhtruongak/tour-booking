//routes/tour
const express = require("express");
const toursDAOS = require("../daos/tours");
const router = express.Router();
const authDAOS = require("../daos/auth");

router.route("/").get(toursDAOS.getAllTours).post(toursDAOS.createTour);
router.get("/search", toursDAOS.searchTours);
router.route("/:id").get(toursDAOS.getTour);

module.exports = router;
