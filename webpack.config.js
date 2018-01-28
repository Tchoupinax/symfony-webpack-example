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
     }
}