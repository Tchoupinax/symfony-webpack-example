# symfony-webpack-example
Example of a webpack project configuration integrated with symfony 4.0.

## Minimal requirements of Symfony
Creation of symfony project.
```bash
composer create-project symfony/skeleton symfony-webpack-example
```

Installation of the server.
```bash
composer require server --dev
```

Make controller maker command available.
```bash
composer require make annotations
```

Use Twig as engine template.
```bash
composer require twig
```

Create defaut controller to have at least root page.
```bash
php bin/console make:controller
```

Let's run the server !
```bash
php bin/console server:run
```

## Installation and configuration about Webpack
Init NPM project.
```bash
npm init -y
```

Loading webpack's dependancies. Webpack is only needed as a development dependance.
```bash
npm install --D webpack 
```

Webpack's binary is now available at `./node_modules/.bin/webpack`. You can test this with following command : 
```bash
./node_modules/.bin/webpack assets/ts/app.ts public/web/bundle.js
```

We can add some alias in package.json to avoid command line
```json
"scripts": {
     "dev": "webpack"
},
```

Create the configuration file named `webpack
.config.js` at the project's root
```js
// Start with this 
module.exports = {

}
```

### 1 - Entry and output path

We are defined entry and output of ours scripts (Relative path needed !)
```js
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
```

### 2 - Babeljs & Browser compatibilities -- IE6 Forever <3

All webpack loaders are list [here](https://webpack.js.org/loaders/).

Explications : Le coeur de webpack est un emsemble de loaders que l'on va ajouter à notre configuration pour détailler ce qu'on souhaite faire des fichiers que l'on donne en entrée.

Les modules ont des règles qui sont détaillée par la suite. Chaque règle est appliquée à une sorte bien précise de fichier. La clef `test` permet de faire ce filtre avec des regex.

We install Babeljs as a loader so that javascript are understood by old browsers (ES2015 is unknow by old browsers, but we want to use it !).
```bash
npm install --D babel-loader babel-core babel-preset-env
```

Babel rule model
```js
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
}
```

Babeljs needs a configuration options for running so we will create a file named `.babelrc` at the project's root.

```json
{
     "presets": [
          ["env", {
               "targets": {
                    "browsers": ["last 2 versions", "safari >= 7"]
               }
          }]
     ]
}
```

`presets` allow you to specify with which browser you want to be compatible. (Configuration exemple was taken [here](https://babeljs.io/docs/plugins/preset-env). Specify your wanted browsers !).

### 3 - Use plugins for minify

Installation of plugin uglify-js
```bash
npm i -D uglifyjs-webpack-plugin
```

Add it to our webpack configuration file
```js
// Array of used plugins
plugins: [
     new UglifyJS()
]
```

However you only want to minfy our script when we are in production environement, so we need to add a condition about performing environement.

```json
"scripts": {
     "dev": "NODE_ENV=dev webpack",
     "prod": "webpack",
},
```

So we add a condition before exports the configuration
```js
// In the environment way, we add specifies plugins
if (!dev) {
     webpackConfiguration.plugins.push(new UglifyJS());
}
```

### 4 - Sourcemap, know your line !

/!\ You need to enable your browser option `Enable JavaScript source maps`.

You can choose different option to create source map, better speed = lower precision. [Details](https://webpack.js.org/configuration/devtool/)

So for adding it, add `devtools` options
```js 
// Adding devtool to create source maps     
devtool: dev ? 'cheap-module-eval-source-map' : false,
```

Warning about Uglify-js, which by default ignore all source map. So if you want to allow source map in production mode, you have to specify you want to export source maps to uglify.
To allow source maps in production, just tell to Uglify to accept source map and specify them.
```js 
// Adding devtool to create source maps     
devtool: dev ? 'cheap-module-eval-source-map' : 'source-map',

// Uglify plugin
webpackConfiguration.plugins.push(new UglifyJS({
     // To export source maps in production
     sourceMap: true
}));
```

### 5 - Lazy loading

You can lary load your modules with adding your imported modules only at the moment you want to use them.

```js
// Adding a listener 
document.getElementById('btn').addEventListener('click', function () {
     // Import library when button is clicked
     // Can import several librairies
     import('jquery, otherLibrary...').then(($, otherName) => {
          // Do something
     });
});
```

But in this way, webpack does not like that it exists imports that are not at the top of the file. To fix it, we need to add a plugin.

```bash
npm i -D babel-plugin-syntax-dynamic-import
```

```json
{
    "presets": [
        ["env", {
             // Adding this value
            "modules": false,
            "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
            }
        }]
    ],
     // Specify we use the plugin
    "plugins": ["syntax-dynamic-import"]
}
```

You must to fix the path in webpack configuration because by default it searchs file from root

```json
output {
    publicPath: "/web/"
}
```