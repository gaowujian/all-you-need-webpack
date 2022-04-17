const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    //  prettier-ignore
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // new CleanWebpackPlugin({ verbose: true }),
    new webpack.DefinePlugin({
      globalVariable: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
