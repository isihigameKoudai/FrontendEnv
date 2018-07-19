const path = require('path');
const baseConfig = require('./base.config.js');
let merge = require('webpack-merge');

const config = merge(baseConfig, {
	mode: 'production',
});

module.exports = config;
