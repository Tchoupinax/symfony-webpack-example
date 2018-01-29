// Need it for absolute path
const path = require('path');
// Adding Uglify-js
const UglifyJS = require('uglifyjs-webpack-plugin');

// Environement variable
const dev = process.env.NODE_ENV === "dev";

// Configuration
let webpackConfiguration = {
    // Entry point
    entry: './assets/ts/app.ts',
    // Automatic reloading on save
    // Watch is only running on development environment
    watch: dev,
    // Output configuration
    output: {
        // Directory where put files
        // As webpack need an absolute path, we use require('path') to resolve it
        path: path.resolve('./public/web'),
        // How is called the output file
        filename: 'bundle.js',
        // Specify where output file are situated 
        // (by default there are in the root)
        publicPath: "/web/"
    },
    // Adding devtool to create source maps
    // If we want to allow sourcemap in production, we can specify 'source-map'
    devtool: dev ? 'cheap-module-eval-source-map' : false, // 'source-map',
    // Adding module for loaders
    module: {
        // Array of set of rules
        // Rule is an object
        //
        // Meanging : "i want that files which have .ts pass throught babel-loader"
        rules: [{
            // Regex to select files which answer to this rule
            test: /\.ts$/,
            // Exclude node-modules
            exclude: /(node_modules|bower_components)/,
            // Specify used loaders
            // babel-loader is waiting for options, but we can specify them in an other file called .babelrc
            use: ['babel-loader']
        }]
    },
    // Array of used plugins
    plugins: []
}

// In the environment way, we add specifies plugins
if (!dev) {
    webpackConfiguration.plugins.push(new UglifyJS({
        // To export source maps in production
        // sourceMap: true
    }));
}
module.exports = webpackConfiguration;