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
if (process.env.NODE_ENV === "development") {
}

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000",
  })
);
app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
///connnect to main page
app.use("/", viewsRouter);
app.use("/tours", tours);
app.use("/users", users);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
