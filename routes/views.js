const express = require("express");
const views = require("../daos/views");
const router = express.Router();

router.get("/", views.getOverview);
router.get("/tour", views.getTour);

module.exports = router;
