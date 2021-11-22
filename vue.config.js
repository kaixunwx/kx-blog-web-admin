const path = require('path')
const defaultSettings = () => import('./src/settings.js')
function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // 网址标题
const port = 8099 // 端口配置

module.exports = {  // hash 模式下可使用
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
            },
            '/auth': {
                target: process.env.VUE_APP_BASE_API,
                changeOrigin: true,
                pathRewrite: {
                    '^/auth': 'auth'
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),
                '@crud': resolve('src/components/Crud'),
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ]
}


