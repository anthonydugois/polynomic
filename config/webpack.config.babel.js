import path from "path"
import webpack from "webpack"

const srcPath = path.join(__dirname, "..", "src")
const distPath = path.join(__dirname, "..", "dist")

export default {
  entry: {
    index: path.join(srcPath, "index"),
  },
  output: {
    path: distPath,
    filename: "[name].js",
    libraryTarget: "umd",
  },
  resolve: {
    root: srcPath,
    extensions: ["", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: "eslint",
        include: srcPath,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
      },
    ],
  },
}
