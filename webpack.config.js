// Need it for absolute path
const path = require('path');

// Configuration
module.exports = {
     // Entry point
     entry: './assets/ts/app.ts',
     // Automatic reloading on save
     watch: true,
     // Output configuration
     output: {
          // Directory where put files
          // As webpack need an absolute path, we use require('path') to resolve it
          path: path.resolve('./public/web'),
          // How is called the output file
          filename: 'bundle.js'
     },
     // Adding module for loaders
     module: {
          // Array of set of rules
          // Rule is an object
          rules: [{
               // Regex to select files which answer to this rule
               test: /\.ts$/,
               // Exclude node-modules
               exclude: /(node_modules|bower_components)/,
               // Specify used loaders
               // babel-loader is waiting for options, but we can specify them in an other file called .babelrc
               use: ['babel-loader']
          }]
     }
}