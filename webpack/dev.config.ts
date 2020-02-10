const baseConfig = require("./base.config.ts");
let merge = require("webpack-merge");

const config = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",
    host: "127.0.0.1",
    port: 3000
  }
});

module.exports = config;
