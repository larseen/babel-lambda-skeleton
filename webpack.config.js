var webpack = require("webpack"); // eslint-disable-line

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: './dist',
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new webpack.IgnorePlugin(/cls-bluebird/, /request-promise/)
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};
