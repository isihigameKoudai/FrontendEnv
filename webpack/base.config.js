const path = require('path');
const webpack = require('webpack');

const BUILD_ROOT = path.join(__dirname, '../dest');
const SRC_ROOT = path.join(__dirname, '../src');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: SRC_ROOT,
  entry: ['babel-polyfill', path.resolve('src', 'index.js')],
  output: {
    filename: 'bundle.js',
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css)$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|json|svg)$/,
        loaders: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [new VueLoaderPlugin()]
};
