import path from "path"
import webpack from "webpack"

export default {
  entry: {
    app: path.join(__dirname, "..", "index.js"),
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    publicPath: "/dist/",
    filename: "[name].js",
  },
  resolve: {
    root: path.join(__dirname, "..", "packages"),
    extensions: ["", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    })
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
