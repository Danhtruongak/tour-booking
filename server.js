//server.js
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {})
  .then(() => {
    console.log("DB connection successful ");
  })
  .catch((error) => {
    console.error("db connection error:", error);
  });

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
