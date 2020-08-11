const path = require('path')
module.exports = {
    devServer: {
        open: true,
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: 'http://localhost:8080',
    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem')({
                        // 适配 360 屏幕, 设计图720中量出来的尺寸要 / 2
                        // 适配 375 屏幕, 设计图750中量出来的尺寸要 / 2
                        remUnit: 36
                    })
                ]
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.resolve('./src'))
            .set('components', path.resolve('./src/components'))
            .set('pages', path.resolve('./src/pages'))
            .set('assets', path.resolve('./src/assets'))
        // set第一个参数：设置的别名，第二个参数：设置的路径
    }
}