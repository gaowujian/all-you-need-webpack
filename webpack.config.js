const HtmlWebpackPlugin = require("html-webpack-plugin");
// v5之后使用 output.clean属性内置
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 提取css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//v4压缩css文件
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//v5压缩css文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 给html插入变量
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
// 分析打包结果
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
//  测速插件
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// gzip压缩插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const GetModulesPlugin = require("./plugins/get-modules-plugin");
const webpack = require("webpack");
const { resolve } = require("path");
const isDevelopment = process.env.NODE_ENV === "development";
const NODE_ENV = isDevelopment ? "development" : "production";

function resolvePath(...args) {
  return resolve(__dirname, ...args);
}
const paths = {
  rootPath: resolvePath("."),
  srcPath: resolvePath("src"),
  distPath: resolvePath("dist"),
  publicPath: resolvePath("public"),
  template: resolvePath("src/template.html"),
};
// const smp = new SpeedMeasurePlugin();
// module.exports = smp.wrap(webpackConfig)
module.exports = {
  context: paths.rootPath,
  mode: isDevelopment ? "development" : "production",
  devtool: isDevelopment ? "eval-cheap-module-source-map" : "eval-cheap-module-source-map",
  entry: {
    main: "./src/index.tsx",
  },

  output: {
    path: paths.distPath,
    // 用于给非初始化chunk的名字
    // chunkFilename: "",
    // 每个entry对应了一个chunk设置名字
    filename: "[name].[chunkhash:6].bundle.js",
    // 开发环境使用 ""，表示资源查找相对于html文件位置, 生产环境需要使用服务器的域名 例如 www.3w6d.com
    // 用来给html插入资源前加前缀
    publicPath: "",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: 3,
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: true,
              import: true,
              modules: false,
              sourceMap: true,
              importLoaders: 1,
              esModule: true,
            },
          },
          "postcss-loader",
        ],
      },

      {
        test: /\.less$/,
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
    splitChunks: {
      chunks: "all", //配置所有chunk都要切分，包括入口的main chunk，除了两条分组规则，其他采用默认值
      // minSize: 20000, //只有超过30B，才会触发分块的逻辑
      // minRemainingSize: 0,
      // minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3, //
      // enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          filename: "[name]~bundle.js",
        },
        commons: {
          name: "commons",
          minChunks: 2, // 至少有两个chunk里引用了同一个module才有必要拆分, 多页应用，或者import()异步加载
          priority: -20,
          reuseExistingChunk: true,
          filename: "[name]~bundle.js",
        },
      },
    },
  },
  devServer: {
    static: paths.publicPath,
    port: 3000,
    open: false,
    hot: true, //  webpack-dev-server会自动在plugins中插入new webpack.HotModuleReplacementPlugin(),
    // onBeforeSetupMiddleware: function ({ app }) {
    //   app.get("/users", (req, res) => {
    //     res.json({
    //       name: "wujian",
    //       age: 28,
    //     });
    //   });
    // },
  },
  resolve: {
    extensions: [".js", ".json", ".js", ".ts", ".jsx", ".tsx"],
    modules: ["node_modules"],
    alias: {
      "@": resolvePath("src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.template,
      minify: isDevelopment ? false : true,
      scriptLoading: "defer",
      cdn: {
        css: ["https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css"],
        js: !isDevelopment
          ? [
              "https://cdn.bootcdn.net/ajax/libs/react/18.1.0-next-726ba8029-20220415/umd/react.production.min.js",
              "https://cdn.bootcdn.net/ajax/libs/react-dom/18.1.0-next-726ba8029-20220415/umd/react-dom.production.min.js",
            ]
          : [],
      },
    }),
    new webpack.DefinePlugin({
      globalVariable: JSON.stringify(process.env.NODE_ENV),
    }),
    !isDevelopment &&
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:6].css",
        chunkFilename: "[id].css",
      }),
    !isDevelopment &&
      new CopyWebpackPlugin({
        patterns: [
          {
            // 默认不设置to就会打包到输出目录下
            from: "public",
          },
        ],
      }),
    new CssMinimizerPlugin(),
    new webpack.ProgressPlugin(),
    // 开启Gzip压缩，同时nginx配饰 gzip_static会优先返回gz的资源，减少服务器压力
    // new CompressionWebpackPlugin({
    //   test: /\.(js|css)(\?.*)?$/i,
    //   threshold: 1024 * 30, // 30K
    //   minRatio: 0.8,
    //   exclude: /node_modules/,
    // }),

    // new InterpolateHtmlPlugin({
    //   NODE_ENV: NODE_ENV,
    // }),
    // new BundleAnalyzerPlugin(), // 使用默认配置
    // new GetModulesPlugin(), // 自定义插件打印 modules信息
  ].filter(Boolean),
  resolveLoader: {
    alias: {
      "my-file-loader": resolve(__dirname, "loaders/my-file-loader.js"),
    },
  },
  // 打包的输出信息 normal | verbose | minimal
  stats: "normal",
  //  react对应src代码中的from后字段，React表示在浏览器下umd打包挂载全局的是React,在src的代码不一定使用React
  externals: !isDevelopment
    ? {
        react: "React",
        "react-dom": "ReactDOM",
        lodash: "_",
      }
    : {},
};
