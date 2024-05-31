//daos/views
const Tour = require("./../models/tours");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

module.exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get tour data from collection
  const tours = await Tour.find({});
  // 2. build template
  // 3. render template

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
    user: req.user,
  });
});

module.exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "guides",
    select: "name photo roles",
  });
  // console.log("tour:", tour);
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
    user: req.user,
  });
});
//route handler for login
module.exports.getLogInForm = (req, res) => {
  res.status(200).render("logInTemplate", {
    title: "Log in into your account",
    user: req.user,
  });
  console.log("req.user:", req.user);
};
