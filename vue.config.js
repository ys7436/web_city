module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: 'http://localhost:824/'
    // port: '5004'
    // proxy: {
    //   '/api': {
    //     target: 'http://119.3.244.219:80/',
    //     // changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'CityManagement',
  assetsDir: 'static'
}
