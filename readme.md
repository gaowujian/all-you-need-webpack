# bear in mind

1. module.exports 注意拼写
2. 入口是 entry 不是 src
3. publicPath: 该属性会被 html-webpack-plugin 插件使用, 只会影响经过 webpack 打包处置之后，插入 html 文件的时候访问路径的前缀，默认是一个空串, 可以根据需要设置为 / 或者 /static 等其他
4. 环境变量问题
   1. --mode 用来设置模块内的 process.env.NODE_ENV : 比如一段浏览器中的代码，例如 api 的地址，我们需要根据环境的不同来进行地址的切换
   2. --env 用来设置 webpack 配置文件的函数参数 : 用来进行 webpack 配置文件的区分处理，和客户端代码不同，例如开发环境下，和生产环境下的插件不同
   3. cross-env 用来设置 node 环境的 process.env.NODE_ENV： 和 2 的使用目的相同, 是一个第三方的通用环境变量配置解决方案
   4. DefinePlugin 用来设置模块内的全局变量： --mode 已经提前占用了 process.env.NODE_ENV 这个变量，如果有其他的场景需要额外变量可以自行再设置
5. webpack serve 需要安装额外的 webpack-dev-serve 包
   1. 在没有配置 devServe 的配置项的时候，会使用默认配置创建一个 express 服务器，所有渲染的内容都存储在内存中，而不是去 serve 一个本地的 dist 目录
   2. 如果需要额外的静态文件挂载，这些文件的特性就是不需要 webpack 进行打包以及额外的分析，可以使用 static 属性 效果和 express.static()中间件同理，在 webpack5 之前使用的 contentBase 属性而不是 static 属性
   3. 例如在开发阶段，我们的图片可以放在了 public 目录下，但是打包的时候，需要使用 copy-webpack-plugin 把 public 的文件，全部拷贝到 dist 打包目录下
6. 在我们使用 raw-loader, file-loader 以及 url-loader 时候
   1. 不管是使用 require 或者是 import 进行引入
   2. type: asset/source 类型的资源，webpack 进行 rawloader 操作,导出资源的源代码而不是，而不是想 url-loader 转为 dataurl，他的结果是不可读的乱码
      1. 例如文本资源，适用于这种类型
   3. type: asset/resource 类型的资源 == file-loader，webpack 会直接输出这个资源到打包的目录下，类似于 copy-plugin，同时返回一个 hash 的地址
      1. 例如大图片资源，也是非可读的二进制资源
   4. type: asset/inline 类型的资源 === url-loader, webpack 会返回一个资源进行 base64 编码后的字符串，也就是 dataurl 的结果
      1. 例如小图片资源，非可读资源，可以减少 http 请求
   5. type: asset 同时还可以设置条件，判断是导出文件内容返回地址，或者是直接返回 base64 的文件内容
7. 对于图片类的静态资源
   1. 有的时候需要进行动态加载，例如瀑布流，我们就需要对他们进行打包，设置对应的打包规则
   2. 否则可以直接使用 copy-plugin 把文件资源拷贝到打包目录下，并部署
8. 通过 css-loader 配置，开启 css-module 处理
