//models/tours

const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    index: true,
  },
  duration: { type: Number, required: [true, "A tour must have a duration"] },
  rating: { type: Number, default: 4.5 },
  price: {
    type: Number,
    required: [true, "A tour mush have a price"],
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },

  images: [String],
  createdAt: { type: Date, default: Date.now },
  startDates: [Date],
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
