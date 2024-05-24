const express = require("express");
const app = express();
const tourRoute = require("./routes/tours");
const userRoute = require("./routes/users");

//////////middleware////////////////////
app.use(express.json()); //1.middleware
app.use((req, res, next) => {
  console.log("middleware");
  next();
});

app.use("/tours", tourRoute);
app.use("/users", userRoute);

module.exports = app;
