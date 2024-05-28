const Tour = require("./../models/tours");
const catchAsync = require("./../utils/catchAsync");

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get tour data from collection
  const tours = await Tour.find({});
  // 2. build template
  // 3. render template

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render("tour", {
    title: "Vinh Ha Long Tours",
  });
};
