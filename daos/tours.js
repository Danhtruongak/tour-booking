//daos/tours
const Tour = require("./../models/tours");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

exports.getAllTours = factory.getAll(Tour);
exports.getTour = factory.getOne(Tour, { path: "guides" });
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: "$difficulty" },
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
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
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]).option({ maxTimeMS: 60000 }); // Set the timeout to 60 seconds

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});

exports.createTour = catchAsync(async (req, res, next) => {
  const { name, description, duration, maxGroupSize, price, summary } =
    req.body;

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
