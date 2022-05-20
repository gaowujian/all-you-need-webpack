/**
 *  !用于实现生产环境下，外链的自动添加
 */
const { ExternalModule } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.externalModules = Object.keys(options);
    this.importedModules = new Set();
  }
  apply(compiler) {
    // 1. 模块创建后触发钩子
    compiler.hooks.normalModuleFactory.tap("AutoExternalPlugin", (normalModuleFactory) => {
      // 2. 找到 js模块进行分析
      normalModuleFactory.hooks.parser.for("javascript/auto").tap("AutoExternalPlugin", (parser) => {
        // 3. 解析js模块中的import语法和require语法

        parser.hooks.import.tap("AutoExternalPlugin", (statement, source) => {
          if (this.externalModules.includes(source)) {
            this.importedModules.add(source);
          }
        });

        parser.hooks.call.for("require").tap("AutoExternalPlugin", (expression) => {
          const val = expression.arguments[0].value;
          if (this.externalModules.includes(val)) {
            this.importedModules.add(val);
          }
        });
      });

      //    4.真正引入的外链模块已经找到，开始介入干预模块的加载过程, 把模块改造成一个外链模块
      normalModuleFactory.hooks.factorize.tapAsync("AutoExternalPlugin", (resolvedData, callback) => {
        const { request } = resolvedData;
        if (this.externalModules.includes(request)) {
          let { variable } = this.options[request];
          callback(null, new ExternalModule(variable, "window", request));
        } else {
          callback();
        }
      });
      //   5. 通过html-webpack-plugin的钩子注入自动插入的外链
      compiler.hooks.compilation.tap("AutoExternalPlugin", (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync("AutoExternalPlugin", (htmlData, callback) => {
          Object.keys(this.options)
            .filter((key) => this.importedModules.has(key))
            .forEach((key) => {
              htmlData.assetTags.scripts.unshift({
                tagName: "script",
                voidTag: false,
                attributes: {
                  defer: false,
                  src: this.options[key].url,
                },
              });
            });

          callback(null, htmlData);
        });
      });
    });
  }
}

module.exports = AutoExternalPlugin;
