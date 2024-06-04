//routes/users.js
const express = require("express");
const userDAOS = require("./../daos/users");
const authDAOS = require("./../daos/auth");

const router = express.Router();

router.post("/signup", authDAOS.signup);
router.post("/login", authDAOS.login);
router.get("/logout", authDAOS.logout);

router.route("/").get(userDAOS.getAllUsers).post(userDAOS.createUser);

router
  .route("/:id")
  .get(userDAOS.getUser)
  .patch(userDAOS.updateUser)
  .delete(userDAOS.deleteUser);

module.exports = router;
