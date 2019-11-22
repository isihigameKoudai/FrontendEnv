const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const BUILD_ROOT = path.join(__dirname, "../dist");
const SRC_ROOT = path.join(__dirname, "../src");

const manifest = require('../manifest.json');

module.exports = {
  context: SRC_ROOT,
  entry: {
    index: path.resolve("src", "index.ts")
  },
  output: {
    filename: '[name].js',
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          { loader: 'thread-loader' },
          {
            loader: 'ts-loader',
            options: {
                happyPackMode: true
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: "sass-loader",
        options: {
          outputStyle: "expanded",
          sourceMap: true
        }
      },
      {
        test: /\.(jpg|png|json|svg)$/,
        loaders: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": SRC_ROOT + '/'
    }
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: manifest.name,
      template: SRC_ROOT + '/assets/template/index.html.ejs',
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, user-scalable=no"
        },
        { hid: "description", name: "description", content: manifest.description },
        { property: 'og:title', content: manifest.name },
        { property: 'og:type', content: 'website'},
        { property: 'og:image', content: '' },
        { property: 'og:image:alt', content: '' },
        { property: 'og:url', content: '' },
        { property: 'og:locale', content: 'ja_JP' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: manifest.name },
        { name: 'twitter:description', content: manifest.description },
        { name: 'twitter:image', content: '' }
      ]
    })
  ]
};
