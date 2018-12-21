module.exports = {
  // 打包目标文件夹
  outputDir: "webApp",
  // 是否开启eslint警告
  lintOnSave: true,
  // 判断是否为生产环境从而改变基本url
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",
  // 代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://10.1.1.167:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
