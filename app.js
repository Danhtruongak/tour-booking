//app
const express = require("express");
const app = express();

const tourRoute = require("./routes/tours");
const userRoute = require("./routes/users");

app.use(express.json());

//middlware catch err after all routes
app.use((req, res, next) => {
  app.requestTime = new Date().toISOString();
  next();
});

app.use("/tours", tourRoute);
app.use("/users", userRoute);

//Catch all route handler for undefined routes
app.all("*", (req, res, next) => {
  //create err
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.status = "fail";
  err.status = 404;
  next(err);
});

//error handler central
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
