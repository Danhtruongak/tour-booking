//app
const path = require("path");
const express = require("express");
const app = express();
const AppErrors = require("./utils/appError");
const globalErrorHandler = require("./daos/errors");
const tourRoute = require("./routes/tours");
const userRoute = require("./routes/users");
const viewsRouter = require("./routes/views");
app.use(express.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//middlware catch err after all routes
app.use((req, res, next) => {
  app.requestTime = new Date().toISOString();

  next();
});

app.get("/", viewsRouter);
app.use("/tours", tourRoute);
app.use("/users", userRoute);

//Catch all route handler for undefined routes
app.all("*", (req, res, next) => {
  next(new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
