# bear in mind

1. module.exports 注意拼写
2. 入口是 entry 不是 src
3. 环境变量问题
   1. --mode 用来设置模块内的 process.env.NODE_ENV : 比如一段浏览器中的代码，例如 api 的地址，我们需要根据环境的不同来进行地址的切换
   2. --env 用来设置 webpack 配置文件的函数参数 : 用来进行 webpack 配置文件的区分处理，和客户端代码不同，例如开发环境下，和生产环境下的插件不同
   3. cross-env 用来设置 node 环境的 process.env.NODE_ENV： 和 2 的使用目的相同, 是一个第三方的通用环境变量配置解决方案
   4. DefinePlugin 用来设置模块内的全局变量： --mode 已经提前占用了 process.env.NODE_ENV 这个变量，如果有其他的场景需要额外变量可以自行再设置
4. webpack serve 需要安装额外的 webpack-dev-serve 包
   1. 在没有配置 devServe 的配置项的时候，会使用默认配置创建一个 express 服务器，所有渲染的内容都存储在内存中，而不是去 serve 一个本地的 dist 目录
   2. 如果需要额外的静态文件挂载，可以使用 static 属性 效果和 express.static()中间件同理
