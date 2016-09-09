import path from "path"
import webpack from "webpack"

const srcPath = path.join(__dirname, "..", "src")
const distPath = path.join(__dirname, "..", "dist")

export default {
  output: {
    library: "Polynomic",
    libraryTarget: "umd",
  },
  resolve: {
    root: srcPath,
    extensions: ["", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    ...process.env.NODE_ENV === "production" && [
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
    ],
  ],
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
