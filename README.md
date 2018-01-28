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
npm install --save-dev webpack 
```

Webpack's binary is now available at `./node_modules/.bin/webpack`. You can test this with following command : 
```bash
./node_modules/.bin/webpack assets/ts/app.ts public/web/bundle.js
```

We can add some alias in package.json to avoid command line
```json
"scripts": {
     "dev": "webpack",
     "test": "echo \"Error: no test specified\" && exit 1"
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

### 2 - Loaders (Babeljs & Browser compatibilities -- IE6 Forever <3)

Explications : Le coeur de webpack est un emsemble de loaders que l'on va ajouter à notre configuration pour détailler ce qu'on souhaite faire des fichiers que l'on donne en entrée.

Les modules ont des règles qui sont détaillée par la suite. Chaque règle est appliquée à une sorte bien précise de fichier. La clef `test` permet de faire ce filtre avec des regex.

We install Babeljs as a loader so that javascript are understood by old browsers (ES2015 is unknow by old browsers, but we want to use it !).
```bash
npm install --save-dev babel-loader babel-core babel-preset-env
```

Babel rule model
```js
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

`presets` allow you to specify with which browser you want to be compatible. (Configuration exemple was taken at : https://babeljs.io/docs/plugins/preset-env/. Specify yout wanted browsers !).