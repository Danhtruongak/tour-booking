// daos/view
const Tour = require("./../models/tours");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const User = require("./../models/users");

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  console.log("Rendering overview");
  console.log("User data in getOverview:", res.locals.user);
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug });

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  console.log("Rendering tour");
  console.log("User data in getTour:", res.locals.user);
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

// Route handler for login
exports.getLoginForm = (req, res) => {
  console.log("Rendering login form");
  console.log("User data in getLoginForm:", res.locals.user);
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  console.log("Rendering user account");
  console.log("User data in getAccount:", res.locals.user);
  res.status(200).render("account", {
    title: "Your account",
  });
};
