const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  devtool: false,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,

        loader: "my-babel-loader",
        // options: {
        //   presets: ["@babel/preset-react", "@babel/preset-typescript", "@babel/preset-env"],
        // },

        options: {
          presets: ["@babel/preset-env"],
        },
      },
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
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       raw: false,
        //     },
        //   },
        // ],

        loader: path.resolve(__dirname, "loaders", "my-file-loader.js"),
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
    onBeforeSetupMiddleware: function ({ app }) {
      app.get("/users", (req, res) => {
        res.json({
          name: "wujian",
          age: 28,
        });
        // res.end("wujian");
      });
    },
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".tsx"],
  },
  plugins: [
    //  prettier-ignore
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // new CleanWebpackPlugin({ verbose: true }),
    new webpack.DefinePlugin({
      globalVariable: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolveLoader: {
    alias: {
      "my-babel-loader": path.resolve(__dirname, "loaders/my-babel-loader.js"),
    },
    // modules: [path.resolve("./loader"), "node_modules"],
  },
};
