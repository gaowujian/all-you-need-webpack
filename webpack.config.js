const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");
const isDevelopment = process.env.NODE_ENV === "development";
module.exports = {
  mode: isDevelopment ? "development" : "production",
  devtool: false,
  entry: {
    master: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash:6].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      },
      {
        test: /.(c|le)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
              sourceMap: true,
              importLoaders: 2,
              esModule: true,
            },
          },
          "less-loader",
          "postcss-loader",
        ],
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
            maxSize: 4 * 1024,
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "all",
      minSize: 2000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  devServer: {
    static: path.resolve(__dirname, "./public"),
    port: 3000,
    open: true,
    hot: true,
    onBeforeSetupMiddleware: function ({ app }) {
      app.get("/users", (req, res) => {
        res.json({
          name: "wujian",
          age: 28,
        });
      });
    },
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".tsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", minify: false }),
    new webpack.DefinePlugin({
      globalVariable: JSON.stringify(process.env.NODE_ENV),
    }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:6].css",
        chunkFilename: "[id].css",
      }),
    new CleanWebpackPlugin(),
  ],
  resolveLoader: {
    alias: {
      "my-babel-loader": path.resolve(__dirname, "loaders/my-babel-loader.js"),
    },
  },
};
