//daos/auth

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/mailer");
var token = "";

const signToken = (id) => {
  console.log("From signToken: Signing token for user ID:", id);
  token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  console.log("From signToken: Generated token:", token);
  return token;
};

const createSendToken = (user, statusCode, res) => {
  token = signToken(user._id);
  console.log("From createSendToken: Generated token:", token);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  console.log("From createSendToken: Cookie options:", cookieOptions);

  res.cookie("jwt", token, cookieOptions);
  console.log("From createSendToken: Sent token as cookie");

  // Remove password from output
  user.password = undefined;
  console.log("From createSendToken: Removed password from user object");

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
  console.log("From createSendToken: Sent response with token and user data");
};

module.exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  createSendToken(newUser, 201, res);
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("From login: Received login request with email:", email);

  //1 check if email and password provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  //2 find the user by email
  const user = await User.findOne({ email }).select("+password");
  console.log("From login: Found user:", user.name);
  if (!user) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  console.log("From login: Found user:", user.name);

  const correct = await user.correctPassword(password, user.password);
  if (!correct) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  //4 send token
  createSendToken(user, 200, res);
  req.user = user;
  console.log("From login: Logged in user:", user.name);
});

module.exports.logout = async (req, res) => {
  try {
    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Perform server-side logout operations
    // 1. Invalidate the token on the server-side
    // You can implement token invalidation based on your authentication strategy
    // For example, if using JWT, you can add the token to a blacklist or revoke it

    // 2. End the user's session
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      }
    });

    // 3. Update the user's last logout timestamp in the database
    await User.findByIdAndUpdate(userId, {
      lastLogoutAt: Date.now(),
    });

    // Send a response with an expired JWT cookie and success message
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      message: "Logged out successfully!",
    });
  } catch (error) {
    // Handle any errors that occur during logout
    console.error("Logout error:", error);
    res.status(500).json({
      status: "error",
      message: "An error occurred during logout.",
    });
  }
};
//middleware protect routes
module.exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1.get token and check if it exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  //2 validate token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //3 check if user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token does no longer exist", 401)
    );
  }
  //4 check if user changed password after token issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again", 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// middleware/isLoggedIn.js
module.exports.isLoggedIn = async (req, res, next) => {
  // Check if there is a token in the request
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next();
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next();
  }
  if (await user.changedPasswordAfter(decoded.iat)) {
    return next();
  }
  req.user = user;
  next();
};

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

module.exports.resetPassword = (req, res, next) => {};
