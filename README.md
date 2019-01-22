### wip: pk-webpack

#### Get Started

Add as dev dependency for any `pk-` module.

#### `pk-` module installation

1. From within your `pk-` module project, add both a `webpack-dev.js` and a `webpack-prod.js` file. These will handle both dev environments.

2. Inside your `package.json`, add them as executable `npm` scripts:

```
package.json
...
"scripts": {
    "dev": "node webpack-dev.js",
    "prod": "node webpack-prod.js"
  },
```

3. Following the syntax below, add these into your executable `webpack-x.js` files:

```
webpack-dev.js
...
const pkWebpack = require('pk-webpack');
const path = require('path');
const appRoot = path.resolve(__dirname, '../');

const config = {
  'mode': 'development'
};

pkWebpack(appRoot, config);

```

This initializes Webpack with the proper dev environment, and passes along the root of the project for proper "build" context. In other words, it gives Webpack knowledge of where to look for, and compile assets. "mode" could either be `development` or `production`, depending on the context and the file that you're in. This gets merged with Webpack's standard configuration object, so you can pass other parameters here as well.

4. `pk-webpack` will look inside your `src` folder for javascript, and sass files within `js`, and `scss` folders respectively. Following best practices, the entry points are `/src/js/site.js` and `/src/scss/site.scss`.

5. `pk-webpack` will build these files into your `/public` directory as `always.css` and `always.js` files, that your `pk-` module *must push in afterConstruct*.

#### Watching & Dev

Running `npm run dev` from within your `pk-` module will start Webpack in `watch` mode.

#### Build & Production

Running `npm run prod` will simply run Webpack once to build the files
