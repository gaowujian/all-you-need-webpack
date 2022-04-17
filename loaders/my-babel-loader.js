const core = require("@babel/core");
const path = require("path");
function loader(source) {
  let filename = this.resourcePath.split(path.sep).pop();
  let options = this.getOptions();
  let loaderOptions = {
    ...options,
    sourceMaps: true, //我会基于上一个份sourcemap生成自己的sourcemap
    filename,
  };
  //code转译后的代码 源代码和转译后的代码的映射文件 抽象语法树
  let { code, map, ast } = core.transformSync(source, loaderOptions);
  //如果想往 下一个loader传递多个值，可以使用this.callback,它是同步的
  this.callback(null, code, map, ast);
}
module.exports = loader;
