const mongoose = require("mongoose");
const validator = require("validator"); //validate email

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email address"],
    photo: String,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password should be at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password confirmation is required"],
    validate: {
      validator: function (el) {
        //this only work on creat & save
        return el === this.password; //password = password
      },
      message: "Passwords are not the same!",
    },
  },
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
