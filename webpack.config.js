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
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
      {
        test: /\.ico$/,
        type: "asset/inline",
      },
      {
        test: /\.txt$/,
        type: "asset/source",
      },
      {
        test: /\.jpg$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, "./public"),
    port: 3000,
    open: true,
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
