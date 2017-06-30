const path = require('path');

module.exports = [
  {
    target: 'electron',
    node: {
      __dirname: false,
    },
    entry: {
      main: './src/js/entrypoints/main.js',
    },
    output: {
      path: path.join(__dirname, 'app'),
      filename: '[name].js'
    },
  },
  {
    target: 'web',
    entry: {
      app: './src/js/entrypoints/app.js',
    },
    output: {
      path: path.join(__dirname, 'app', 'js'),
      filename: '[name].js',
    },
    module: {
      loaders: [
        {test:/\.jsx?$/, loader:'babel-loader'}
      ]
    }
  },
];
