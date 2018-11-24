const path = require("path");

const BUILD_ROOT = path.join(__dirname, "../dist");
const SRC_ROOT = path.join(__dirname, "../src");

module.exports = {
  context: SRC_ROOT,
  entry: path.resolve("src", "index.js"),
  output: {
    filename: "bundle.js",
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
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
    extensions: [".js", ".jsx", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "/src/")
    }
  }
};
