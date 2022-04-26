const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { resolve } = require("path");
const isDevelopment = process.env.NODE_ENV === "development";

function resolvePath(...args) {
  return resolve(__dirname, ...args);
}
const paths = {
  rootPath: resolvePath("."),
  srcPath: resolvePath("src"),
  distPath: resolvePath("dist"),
  publicPath: resolvePath("public"),
};
module.exports = {
  context: paths.rootPath,
  mode: isDevelopment ? "development" : "production",
  devtool: false,
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: paths.distPath,
    filename: "[name].[hash:6].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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
        test: /\.(css|less)$/,
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
        test: /\.(png|jpe?g)$/,
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
    ].filter(Boolean),
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "all",
      minSize: 200000,
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
    static: paths.publicPath,
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
    extensions: [".js", ".json", ".js", ".ts", ".jsx", ".tsx"],
    modules: ["node_modules"],
    alias: {
      "@": resolvePath("src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/template.html", minify: isDevelopment ? false : true }),
    new webpack.DefinePlugin({
      globalVariable: JSON.stringify(process.env.NODE_ENV),
    }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash:6].css",
        chunkFilename: "[id].css",
      }),
    !isDevelopment &&
      new CopyWebpackPlugin({
        from: resolve(),
      }),
    new CleanWebpackPlugin(),
  ].filter(Boolean),
  resolveLoader: {
    alias: {
      "my-file-loader": resolve(__dirname, "loaders/my-file-loader.js"),
    },
  },
  externals: {
    jquery: "jQuery",
  },
};
