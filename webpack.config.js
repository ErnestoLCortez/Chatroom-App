var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: "./src/Main.js"
    },
    output: {
        filename: "public/js/bundle.js",
        sourceMapFilename: "public/js/bundle.map"
    },
    devtool: '#source-map',
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query:{
                    presets:['react', 'es2015', 'stage-1']
                }
            }]
    }
}