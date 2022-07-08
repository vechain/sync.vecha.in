const Path = require('path')
const Prerender = require('prerender-spa-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Renderer = Prerender.PuppeteerRenderer

module.exports = {
    pages: {
        index: {
            entry: 'src/main',
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        checksum: {
            entry: 'src/checksum/main',
            template: 'public/index.html',
            filename: 'checksum.html',
            chunks: ['chunk-vendors', 'chunk-common', 'checksum']
        }
    },
    lintOnSave: false,
    publicPath: '/',
    pwa: {
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true
        }
    },
    configureWebpack: {
        plugins: (() => {
            const items = [
                new HtmlWebpackPlugin({
                    filename: 'r/index.html',
                    template: 'public/index.html',
                    templateParameters: {
                        BASE_URL: '/'
                    },
                    minify: {
                        collapseWhitespace: true,
                        removeComments: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        useShortDoctype: true
                    },
                })
            ]
            if (process.env.NODE_ENV === 'production') {
                items.push(new Prerender({
                    staticDir: Path.resolve(__dirname, 'dist'),
                    routes: ['/'],
                    renderAfterElementExists: '#app',
                    renderer: new Renderer({
                        injectProperty: '$PRERENDER',
                        inject: {
                        }
                    })
                }))
            }
            return items
        })()
    }
}
