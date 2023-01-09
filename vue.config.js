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
  // 配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3030",//代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': ""
        }
      },
    },
  },
  // devServer: {
  //   proxy: "http://127.0.0.1:3030",
  // },
};