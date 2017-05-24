var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: "./src/Main.js"
    },
    output: {
        path: path.join(__dirname, '/public/js/'),
        publicPath: '/public/js/',
        filename: 'bundle.js',
        sourceMapFilename: 'public/js/bundle.map'
    },
    devtool: '#source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    }
}
