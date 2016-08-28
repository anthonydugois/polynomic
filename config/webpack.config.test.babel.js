import path from "path"
import webpack from "webpack"

const srcPath = path.join(__dirname, "..")
const testPath = path.join(__dirname, "..", "test")
const bootstrapPath = path.join(__dirname, "webpack.test.bootstrap.js")

export default {
  entry: {
    test: bootstrapPath,
  },
  output: {
    path: testPath,
    filename: "[name].js",
  },
  resolve: {
    root: srcPath,
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
