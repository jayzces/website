module.exports = {
    publicPath: '/',
    pages: {
        index: {
            entry: 'src/script.js',
            template: 'src/index.html',
            filename: 'index.html'
        }
    },
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule.use('vue-svg-loader').loader('vue-svg-loader');
    },
    pwa: {
        manifestPath: 'site.webmanifest',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
        }
    }
}