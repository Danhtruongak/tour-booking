//routes/users
const userController = require("../controllers/users");
const express = require("express");
const auth = require("./../controllers/auth");
const router = express.Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUsers);

module.exports = router;
