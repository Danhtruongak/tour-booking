//routes/users.js
const express = require("express");
const userDAOS = require("./../daos/users");
const authDAOS = require("./../daos/auth");

const router = express.Router();

router.post("/login", authDAOS.login);
router.get("/logout", authDAOS.logout);
router.route("/").get(userDAOS.getAllUsers);
router.route("/:id").get(userDAOS.getUser);

module.exports = router;
