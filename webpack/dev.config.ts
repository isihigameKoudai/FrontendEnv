import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import { config as baseConfig } from './base.config';

const config: Configuration = merge(baseConfig, {
  mode: "development",
  devtool: "inline-source-map",
  optimization: {
    usedExports: true
  },
  devServer: {
    contentBase: "dist",
    host: "127.0.0.1",
    port: 3000
  }
});

export default config;

