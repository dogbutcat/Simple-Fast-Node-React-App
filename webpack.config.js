var webpack = require('webpack'),
    path = require('path'),
    extend = require('extend')
fs = require('fs');

var publicPath = 'http://localhost';

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        mod !== 'handlebars' ? nodeModules[mod] = 'commonjs ' + mod : null;
    });

var sourceMap = !process.env.DEBUG ? {
    devtool: 'source-map'
} : {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true
        })
    ]
}

var ServerConfig = extend(true, {}, sourceMap, {
    // entry: './src/server.tsx',
    entry: './src/index.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './build'),
        publicPath: '/',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    target: 'node',
    resolve: {
        extensions: ['', '.tsx', '.ts', '.js', '.json', '.handlebars']
    },
    // devtool: 'source-map',
    module: {
        noParse: /node_modules\/json-schema\/lib\/validate\.js/,
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts?sourceMap'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.handlerbars$/,
            loader: 'handlerbars'
        }]
    },
    externals: nodeModules
});
var ClientConfig = extend(true, {}, sourceMap, {
    entry: './src/client/index.tsx',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public/js'),
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    resolve: {
        extensions: ['', '.tsx', '.ts', '.js']
    },
    // devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts?sourceMap'
        }]
    },
    ts: {
        compilerOptions: {
            target: "es5"
        }
    }
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         minimize: true
    //     })
    // ]
})

module.exports = {
    ServerConfig,
    ClientConfig
}