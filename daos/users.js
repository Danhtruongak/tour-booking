//daos/users
const User = require("../models/users");
const catchAsync = require("../utils/catchAsync");

module.exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

module.exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: " this route not yet defined",
  });
};

module.exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: " this route not yet defined",
  });
};

module.exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: " this route not yet defined",
  });
};

module.exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: " this route not yet defined",
  });
};
