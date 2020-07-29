const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const pkg = require('../package.json');

const readDir = require('fs').readdirSync;
const files = readDir('./src/md-extend/data/');
const entry = {};
files.forEach(file => {
    const name = file.split('.')[0];
    entry[name] = './src/md-extend/data/' + file;
});

process.env.NODE_ENV = 'production';

module.exports = {
    devtool: 'source-map',
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                },
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/data'),
        publicPath: '/dist/data/',
        filename: '[name].js',
        library: `${pkg.buildName}/data`,
        // library: 'iview/locale',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            }
        }),
        new UglifyJsPlugin({
            parallel: true,
            sourceMap: true,
        })
    ]
};
