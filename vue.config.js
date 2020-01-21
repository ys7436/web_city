module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    // proxy: 'http://localhost:824/',
    // port: '5004'
    proxy: {
      '/nginx': {
        target: 'http://localhost:824/',
        pathRewrite: {
          '^/nginx': ''
        }
      },
      '/test': {
        target: 'http://119.3.244.219:80/',
        pathRewrite: {
          '^/test': ''
        }
      },
      '/obtain': {
        target: 'http://119.3.244.219:80/',
        pathRewrite: {
          '^/obtain': ''
        }
      },
      '/api': {
        target: 'http://119.3.244.219:10050/',
        pathRewrite: {
          '^/api': ''
        }
      },
      '/public': {
        target: 'http://119.3.244.219:10054/',
        // changeOrigin: true,
        pathRewrite: {
          '^/public': ''
        }
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'CityManagement',
  assetsDir: 'static'
}
