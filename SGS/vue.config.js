const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/SGS/dist/',
  configureWebpack: config => { config.devtool = false; },
  productionSourceMap: false,
})