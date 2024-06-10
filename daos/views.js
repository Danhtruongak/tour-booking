const Tour = require("./../models/tours");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.aggregate([
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
        imageCover: 1,
        duration: 1,
        summary: 1,
        startLocation: 1,
        startDate: 1,
        stops: 1,
        groupSize: 1,
        price: 1,
        ratingsAverage: 1,
        ratingsQuantity: 1,
        slug: 1,
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

  console.log("Tours data:", tours);

  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  try {
    // 1) Get the data, for the requested tour (including reviews and guides)
    const tour = await Tour.findOne({ slug: req.params.slug }).populate(
      "guides"
    );

    console.log("Tour data:", tour);

    if (!tour) {
      return next(new AppError("There is no tour with that name.", 404));
    }

    res.status(200).render("tour", {
      title: `${tour.name} Tour`,
      tour,
    });
  } catch (error) {
    console.error("Error in getTour:", error);
    return next(new AppError("Internal Server Error", 500));
  }
});

// Route handler for login
exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.searchTours = catchAsync(async (req, res, next) => {
  const { query } = req.query;
  const tours = await Tour.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  console.log("Search results:", tours);

  res.status(200).render("searchTours", {
    title: "Search Results",
    tours,
  });
});

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        numTours: { $sum: 1 },
        numRatings: { $sum: "$ratingsQuantity" },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  console.log("Tour stats:", stats);

  res.status(200).render("tourStats", {
    title: "Tour Statistics",
    stats,
  });
});
