///APP
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const AppError = require("./utils/appError");
const tours = require("./routes/tours");
const users = require("./routes/users");
const viewsRouter = require("./routes/views");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// 1) MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
///connnect to main page
app.use("/", viewsRouter);
app.use("/tours", tours);
app.use("/users", users);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.statusCode || "error",
    message: err.message || "Something went wrong!",
  });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
