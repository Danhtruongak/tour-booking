//server
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./models/tours");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to danhtours database");
    Tour.updateMany(
      { searchContent: "" },
      { $set: { searchContent: "" } },
      { new: true },
      (err, updatedTours) => {
        if (err) {
          console.error("Error updating tours:", err);
        } else {
          console.log("Tours updated successfully");
        }
      }
    );
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
