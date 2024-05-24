//middleware check for id params

module.exports.checkID = (req, res, next, value) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

///midlleware to check body include name and price
module.exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  } else {
    next();
  }
};

module.exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",

    data: { message: "welcome to Vietnam tours" },
  });
};
//
module.exports.getTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

module.exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  res.send("Done");
};

module.exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "tour updated",
    },
  });
};
module.exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "tour not found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
