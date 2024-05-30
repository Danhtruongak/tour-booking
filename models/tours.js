//models/tours

const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");

/////////////////schema///
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true, //validator
      trim: true,
      maxlength: [40, "The Tour name should be less than 40 characters"], //validator
      minlength: [10, "The Tour name should be more than 10 characters"], //validator
      validate: [validator.isAlpha, "Tour name must only contain character"], //validator
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1"],
      max: [5, "Rating must be below 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "Summary is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    imageCover: {
      type: String,
    },
    images: {
      type: [String],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startLocation: {
      type: String,
    },
    startDate: {
      type: Date,
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
    },
    stops: {
      type: Number,
    },
    groupSize: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    guides: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
