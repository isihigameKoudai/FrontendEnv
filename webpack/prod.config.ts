const baseConfig = require("./base.config.ts");
let merge = require("webpack-merge");

const config = merge(baseConfig, {
  mode: "production"
});

module.exports = config;
