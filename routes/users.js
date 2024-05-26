const express = require("express");
const router = express.Router();
const usersDAOS = require("../daos/users");
const auth = require("../daos/auth");

router.post("/signup", auth.signup);

//////Mounting a router /user routes/////////////////////////////

router.route("/").get(usersDAOS.getAllUsers).post(usersDAOS.createUser);
router
  .route("/:id")
  .get(usersDAOS.getUser)
  .patch(usersDAOS.updateUser)
  .delete(usersDAOS.deleteUser);

module.exports = router;
