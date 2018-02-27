var webpack = require('webpack')
var path = require('path')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.config.js')
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  entry: './example/index.js',
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    quiet: true,
    port: 8081,
    host: 'localhost'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
})