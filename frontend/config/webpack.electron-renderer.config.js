'use strict';

import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.base.config';

module.exports = {
  ...baseConfig,

  output: {
    ...baseConfig.output,
    path: path.join(__dirname, '/../dist/'),
    publicPath: ''
  },
  entry: [
    path.join(__dirname, '/../app/js/platforms/electron.renderer.js')
  ],

  target: 'electron-renderer',
};
