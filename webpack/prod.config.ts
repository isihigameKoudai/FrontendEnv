import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import { config as baseConfig } from './base.config';

const config: Configuration = merge(baseConfig, {
  mode: "production"
});

export default config;
