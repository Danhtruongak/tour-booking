const express = require("express");
const router = express.Router();
const usersDAOS = require("../daos/users");
const auth = require("../daos/auth");

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.post("/forgotPassword", auth.forgotPassword);
router.post("/resetPassword/:token", auth.resetPassword);
//////Mounting a router /user routes/////////////////////////////

router.route("/").get(usersDAOS.getAllUsers).post(usersDAOS.createUser);
router
  .route("/:id")
  .get(usersDAOS.getUser)
  .patch(usersDAOS.updateUser)
  .delete(usersDAOS.deleteUser);

module.exports = router;
