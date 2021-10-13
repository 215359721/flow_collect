const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'
const isDebug = process.env.VUE_APP_DEBUG === 'debug'
const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  },
  css: [],
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js'
  ]
}

module.exports = {
  publicPath: '/',
  assetsDir: 'assets',
  productionSourceMap: false,
  chainWebpack: config => {
    // src 目录
    config.resolve.alias
      .set('@$', resolve('src'))
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })

    // cdn 加速
    config.plugin('html').tap(args => {
      args[0].cdn = isProd ? assetsCDN : {}
      args[0].title = ''
      args[0].debug = isDebug
      return args
    }).end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true,
        }
      }
    }
  }
}
