const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.API_URL':  JSON.stringify(process.env.API_URL || 'http://localhost:8080'),
  }),
];
if (process.env.NODE_ENV == 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    // compress: { warnings: false },
    mangle: true
  }));
}

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
    module: {
      loaders: [
        {test:/\.jsx?$/, loader:'babel-loader'}
      ]
    },
    plugins: plugins,
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
    },
    plugins: plugins,
  },
  {
    entry: {
      app: './src/scss/app.scss',
    },
    output: {
      filename: './app/css/[name].css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use:[process.env.NODE_ENV == 'production' ? 'css-loader?minimize' : 'css-loader', 'sass-loader'],
          })
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg)$/,
          loaders:['url-loader']
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({filename:'./app/css/[name].css', allChunks:true})
    ],
  },
];
