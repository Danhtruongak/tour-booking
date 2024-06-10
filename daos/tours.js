//daos/tours
const Tour = require("./../models/tours");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate("guides");

  if (!tour) {
    return next(new AppError("No tour found with that slug", 404));
  }

  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.createTour = factory.createOne(Tour);

exports.getAllTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.aggregate([
    {
      $project: {
        name: 1,
        guides: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "guides",
        foreignField: "_id",
        as: "guides",
      },
    },
    {
      $project: {
        name: 1,
        duration: 1,
        ratingsAverage: 1,
        ratingQuantity: 1,
        price: 1,
        summary: 1,
        description: 1,
        imageCover: 1,
        images: 1,
        startDate: 1,
        startLocation: 1,
        stops: 1,
        groupSize: 1,
        slug: 1,
        searchContent: 1,
        guides: {
          $map: {
            input: "$guides",
            as: "guide",
            in: {
              name: "$$guide.name",
              photo: "$$guide.photo",
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    duration,
    maxGroupSize,
    price,
    summary,
    guides,
    ratingsAverage,
    ratingsQuantity,
    difficulty,
    imageCover,
    images,
    startLocation,
    startDate,
    stops,
  } = req.body;

  const searchContent = `${name} ${description}`.toLowerCase();

  const newTour = await Tour.create({
    name,
    description,
    duration,
    ratingsAverage,
    ratingsQuantity,
    difficulty,
    price,
    summary,
    imageCover,
    images,
    startLocation,
    startDate,
    stops,
    maxGroupSize,
    guides,
    searchContent,
  });

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

exports.searchTours = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const searchQuery = query.toLowerCase().replace(/[^a-z0-9]/g, "\\$&");

  const tours = await Tour.find(
    { $text: { $search: searchQuery } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
