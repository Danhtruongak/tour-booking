//daos/tours
const Tour = require("./../models/tours");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.getTour = factory.getOne(Tour, { path: "guides" });
exports.createTour = factory.createOne(Tour);

// daos/tours.js
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
      $unwind: "$guides",
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        guides: {
          $push: {
            name: "$guides.name",
            photo: "$guides.photo",
          },
        },
      },
    },
  ]).option({ maxTimeMS: 60000 }); // Set the timeout to 60 seconds
=======
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);
>>>>>>> parent of 9e5d987 (completed mongoose lookup)

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
////////////////create text search

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
