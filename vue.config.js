const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  // 开启代理服务器(方式一)
  // devServer: {
  //   // 这里配置为目标服务器
  //   proxy: 'http://localhost:5001'
  // }
  // 开启代理服务器（方式二）
  devServer: {
    proxy: {
      // 链接前缀，有这个前缀代理服务器会进行转发
      '/apiStudent': {
        target: 'http://localhost:5001',
        // 必须要写这个否则请求不到
        // 用正则将url中/api替换为空格
        pathRewrite: {
          '^/apiStudent':''
        },
        ws: true,//用于支持web socket
        changeOrigin: true
      },
      '/apiCar': {
        target: 'http://localhost:5002',
        // 必须要写这个否则请求不到
        // 用正则将url中/api替换为空格
        pathRewrite: {
          '^/apiCar':''
        },
        ws: true,//用于支持web socket
        changeOrigin: true
      },
    }
  }
})
