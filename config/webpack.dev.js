const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = merge(common, {
  devServer: {
    contentBase: './dist'
  },
  module:{
    rules:[
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      }
    ]
  },
  
});
