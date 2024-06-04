//webpack.config.js
const path = require("path");

module.exports = {
  mode: "development", // or "production"
  entry: "./public/js/index.js", // Ensure this path is correct
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/js"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
};
