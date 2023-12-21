const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      historyApiFallback: true,
    },
  },
});
