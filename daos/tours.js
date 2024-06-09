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
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]).option({ maxTimeMS: 60000 }); // Set the timeout to 60 seconds

  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
