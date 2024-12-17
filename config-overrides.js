const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'zlib': require.resolve('browserify-zlib'),
    'querystring': require.resolve('querystring-es3'),
    'path': require.resolve('path-browserify'),
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'fs': require.resolve('browserify-fs'),
    'http': require.resolve('stream-http'),
    'timers': require.resolve('timers-browserify'),
    'vm': require.resolve('vm-browserify')
  })
);
