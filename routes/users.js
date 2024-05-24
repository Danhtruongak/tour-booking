const express = require("express");
const router = express.Router();
const usersDAOS = require("../daos/users");

//param middleware
router.param("id", (req, res, next) => {
  next();
});

//////Mounting a router /user routes/////////////////////////////

router.route("/").get(usersDAOS.getAllUsers).post(usersDAOS.createUser);
router
  .route("/:id")
  .get(usersDAOS.getUser)
  .patch(usersDAOS.updateUser)
  .delete(usersDAOS.deleteUser);

module.exports = router;
