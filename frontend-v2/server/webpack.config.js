var path = require('path');

module.exports = {
  entry: ['babel-regenerator-runtime', './src/Server.tsx'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js' ],
    modules: [path.resolve(__dirname, '../src'), '../node_modules'],
    alias: {
      images: path.resolve(__dirname, '../res', 'images'),
      styles: path.resolve(__dirname, '../res', 'styles'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader?cacheDirectory', 'awesome-typescript-loader?useCache=true']
      },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
}