//daos/tours
const Tour = require("../models/tours");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

module.exports.getAllTours = catchAsync(async (req, res, next) => {
  try {
    //create query
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" "); //additional query
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt"); //showed recent one
    }

    //execute query
    const tours = await query;

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    next(err);
  }
});
module.exports.getTour = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const tour = await Tour.findOne({ slug }).populate({
    path: "guides",
    select: "name photo role",
  });

  if (!tour) {
    return next(new AppError("No tour found with that slug", 404));
  }

  res.status(200).render("tour", {
    title: tour.name,
    tour,
  });
});

module.exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  //no longer need try/catch because of catchAsync
  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

module.exports.updateTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid tour ID", 400));
  }

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

module.exports.deleteTour = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError("Invalid tour ID", 400));
  }
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
