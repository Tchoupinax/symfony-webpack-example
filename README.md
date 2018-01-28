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

Create the configuration file named `webpack?.config.js` at the project's root
```js
// Start with this 
module.exports = {

}
```
