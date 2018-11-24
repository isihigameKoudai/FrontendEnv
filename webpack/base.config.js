const path = require("path");

const BUILD_ROOT = path.join(__dirname, "../dist");
const SRC_ROOT = path.join(__dirname, "../src");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  context: SRC_ROOT,
  entry: ["babel-polyfill", path.resolve("src", "index.js")],
  output: {
    filename: "bundle.js",
    path: BUILD_ROOT
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.(css)$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(scss|sass)$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|json|svg)$/,
        loaders: "url-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "/src/")
    }
  },
  plugins: [new VueLoaderPlugin()]
};
