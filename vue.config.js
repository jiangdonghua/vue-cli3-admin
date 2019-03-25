module.exports = {
    publicPath: "/vue-app",// 基本路径
    outputDir: 'dist', // 输出文件目录
    assetsDir:"assets",
    lintOnSave: false, //否在保存的时候检查
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {
          stylus: {
            'resolve url': true,
            'import': [
              './src/theme'
            ]
          }
        },
        modules: false
    },
    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {
        name: 'my-app'
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 5201,
        https: false,
        hotOnly: true,
        proxy: null, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
};
