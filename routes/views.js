//rotues/views.js
const express = require("express");
const viewsDAOS = require("../daos/views");
const authDAOS = require("../daos/auth");
const router = express.Router();

router.use(authDAOS.isLoggedIn);

router.get("/", viewsDAOS.getOverview);
router.get("/tour/:slug", viewsDAOS.getTour);

router.get("/login", (req, res, next) => {
  viewsDAOS.getLoginForm(req, res, next);
});
router.get("/tours/search", viewsDAOS.searchTours);
router.get("/me", viewsDAOS.getAccount);

module.exports = router;
