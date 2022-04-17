const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

// console.log("process.env:", process.env.NODE_ENV);
module.exports = (env) => {
  console.log("env:", env);
  return {
    mode: env.dev ? "development" : "production",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
    },
    plugins: [
      //  prettier-ignore
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      // new CleanWebpackPlugin({ verbose: true }),
    ],
  };
};
