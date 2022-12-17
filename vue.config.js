// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   devServer: {
//     proxy: "http://127.0.0.1:80/api"
//   },
//   transpileDependencies: true
// })

module.exports = {
  // productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3030",
      },
    },
  },
};