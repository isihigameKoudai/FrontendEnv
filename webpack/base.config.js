const path = require('path');
const webpack = require('webpack');

const BUILD_ROOT = path.join(__dirname, '../dest');
const SRC_ROOT = path.join(__dirname, '../src');

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true
        }
      },
      {
        test: /\.(jpg|png|json|svg)$/,
        loaders: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  }
};
