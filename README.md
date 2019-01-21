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

const pkWebpack = require('pk-webpack');
const path = require('path');
const appRoot = path.resolve(__dirname, '../');
return pkWebpack(
  {
    "appRoot": appRoot,
    "env": "dev"
  }
);
```

- This initializes Webpack with the proper dev environment, and passes along the root of the project for proper "build" context. In other words, it gives Webpack knowledge of where to look for, and compile assets.

#### Watching & Dev

Running `npm run dev` from within your `pk-` module will start Webpack in `watch` mode.

#### Build & Production

Running `npm run prod` will simply run Webpack once to build the files
