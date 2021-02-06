import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import merge from 'webpack-merge';
import { config as baseConfig } from './base.config';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

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

