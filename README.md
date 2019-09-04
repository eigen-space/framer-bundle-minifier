# Framer Bundle Minifier

Minify Framer X exported index.html

## How use it?

### From code

1. Just import `minify` from `@eigenspace/framer-bundle-minifier`
2. Pass your `index.html` content into minify function
3. Get your minified version of content

### From project

Type the following in terminal: \
`/node_modules/@eigenspace/framer-bundle-minifier/index.js --i=index.html --o=index.min.html`

### TODO: From OS

https://github.com/eigen-space/framer-bundle-minifier/issues/1/

1. Install `@eigenspace/framer-bundle-minifier` globally: 
      * for yarn:
        `yarn global add @eigenspace/framer-bundle-minifier`
    
      * for npm:
        `npm install --global @eigenspace/framer-bundle-minifier`
   
2. Call script with your input and output paths: \
   `@eigenspace/framer-bundle-minifier --i=index.html --o=index.min.html`
   
## Why do we have that dependencies?

* `@eigenspace/argument-parser` - get arguments from user input in terminal.
* `clean-css` - CSS minifier.
* `uglify-es` - JavaScript minifier.

## Why do we have that dev dependencies?

* `@types/*` - contains type definitions for specific library.
* `@eigenspace/eslint-config-codestyle` - project with eslint config files.
* `@eigenspace/helper-scripts` - common scripts for dev. environment.
* `eslint` - it checks code for readability, maintainability, and functionality errors.
* `@eigenspace/codestyle` - includes lint rules, config for typescript.
* `husky` - used for configure git hooks.
* `lint-staged` - used for configure linters against staged git files.
* `typescript` - is a superset of JavaScript that have static type-checking and ECMAScript features.
