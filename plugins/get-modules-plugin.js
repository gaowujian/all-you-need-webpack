class GetModulesPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, (stats) => {
      console.log("modules:", stats.modules);
    });
  }
}

module.exports = GetModulesPlugin;
