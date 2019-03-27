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
        name: "HML",
        themeColor: "#1d2930",
        msTileColor: "#1D2930",
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#1D2930',
        manifestPath: 'public/site.webmanifest',
        iconPaths: {
            favicon32: 'public/icons/favicon-32x32.png',
            favicon16: 'public/icons/favicon-16x16.png',
            appleTouchIcon: 'public/icons/apple-touch-icon-152x152.png',
            maskIcon: 'public/icons/safari-pinned-tab.svg',
            msTileImage: 'public/icons/mstile-144x144.png'
        },
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'public/service-worker.js',
            // ...other Workbox options...
        }
    }
}