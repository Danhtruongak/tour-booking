//routes/views.js
const express = require("express");
const views = require("../daos/views");
const auth = require("../daos/auth");
const router = express.Router();

router.use(auth.isLoggedIn);
//route for main page
router.get("/", views.getOverview);

//route for individual page
router.get("/tour/:slug", views.getTour);

//route for login
router.get("/login", views.getLogInForm);

module.exports = router;
