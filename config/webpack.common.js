const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'PRODUCTION - The_Cocktail_Project',
      minify:{collapseWhitespace: false},
      hash: true,
      template: './src/pug/main.pug',
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    
    
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};