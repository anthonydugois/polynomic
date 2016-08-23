import path from "path"
import webpack from "webpack"

export default {
  entry: {
    test: path.join(__dirname, "webpack.test.bootstrap.js"),
  },
  output: {
    path: path.join(__dirname, "..", "test"),
    filename: "[name].js",
  },
  resolve: {
    root: path.join(__dirname, "..", "packages"),
    extensions: ["", ".js"],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
      },
    ],
  },
}
