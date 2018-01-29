// Need it for absolute path
const path = require('path');

// Adding Uglify-js
const UglifyJS = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Environement variable
const dev = process.env.NODE_ENV === 'dev';

// Creation of css loaders options
const cssLoaders = [{
    loader: 'css-loader',
    options: {
        importLoaders: 1,
        minimize: !dev
    }
}];

// Adding auto prefix if we are in production
if (!dev) {
    cssLoaders.push({
        // Option to allow css modification
        loader: 'postcss-loader',
        options: {
            plugins: (loader) => [
                // Allow to prefix all css rule for each browser
                require('autoprefixer')({
                    browsers: ['last 2 versions', 'ie > 8']
                })
            ]
        }
    });
}

// Configuration
let webpackConfiguration = {
    // Alias
    resolve: {
        alias: {
            '@css': path.resolve('./assets/css/'),
            '@': path.resolve('./assets/ts/')
        }
    },
    // Entry point
    entry: [
        './assets/scss/app.scss',
        './assets/ts/app.ts'
    ],
    // Automatic reloading on save
    // Watch is only running on development environment
    watch: dev,
    // Output configuration
    output: {
        // Directory where put files
        // As webpack need an absolute path, we use require('path') to resolve it
        path: path.resolve('./public/web'),
        // How is called the output file
        filename: '[name].[chunkhash:8].js',
        // Specify where output file are situated
        // (by default there are in the root)
        publicPath: '/web/'
    },
    // Adding devtool to create source maps
    // If we want to allow sourcemap in production, we can specify 'source-map'
    devtool: dev ? 'cheap-module-eval-source-map' : false,
    // Adding module for loaders
    module: {
        // Array of set of rules
        // Rule is an object
        //
        // Meanging : "i want that files which have .ts pass throught babel-loader"
        rules: [{
            enforce: 'pre',
            test: /\.ts$/,
            exclude: /(node_modules|bower_components)/,
            use: ['eslint-loader']
        }, {
            // Regex to select files which answer to this rule
            test: /\.ts$/,
            // Exclude node-modules
            exclude: /(node_modules|bower_components)/,
            // Specify used loaders
            // babel-loader is waiting for options, but we can specify them in an other file called .babelrc
            use: ['babel-loader']
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    ...cssLoaders,
                    'sass-loader'
                ]
            })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: '[name].[hash:8].[ext]',
                    limit: 10000 // Max size base64
                }
            }, {
                loader: 'img-loader',
                options: {
                    enabled: !dev
                }
            }]
        }]
    },
    // Array of used plugins
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
            disable: dev
        }),
        new ManifestPlugin({
            publicPath: '/web/'
        }),
        new CleanWebpackPlugin(['web'], {
            root: path.resolve('./public/'),
            verbose: true,
            dry: false // True pour faire un test à sec !!
        })
    ]
};

// In the environment way, we add specifies plugins
if (!dev) {
    webpackConfiguration.plugins.push(new UglifyJS({
        // To export source maps in production
        // sourceMap: true
    }));
}

module.exports = webpackConfiguration;
