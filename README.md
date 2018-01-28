# symfony-webpack-example
Example of a webpack project configuration integrated with symfony 4.0.

## Installation de Symfony
Création of symfony project.

     composer create-project symfony/skeleton symfony-webpack-example

Installation of the server.

     composer require server --dev

Make controller maker command available.

     composer require make annotations

Use Twig as engine template.

     composer require twig

Create defaut controller to have at least root page.

     php bin/console make:controller

Let's run the server !

     php bin/console server:run


## Installation and configuration about Webpack
Init NPM project.

     npm init -y

Loading webpack's dependancies. Webpack is only needed as a development dependance.

     npm install --save-dev webpack 
