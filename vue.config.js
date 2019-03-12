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
    }
}