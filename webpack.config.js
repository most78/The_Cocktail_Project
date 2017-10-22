const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  devServer: {
    contentBase: './dist'
  },
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'url-loader'
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        }
      )
    },
    {
      test: /\.html$/,
      use: 'html-loader',
    },
  ]
},
plugins: [
  new CleanWebpackPlugin(['./dist']),
  new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true,
  }),
  new HtmlWebpackPlugin({
    title: 'The_Cocktail_Project',
    minify:{collapseWhitespace: false},
    hash: true,
    template: './src/index.html',
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default'],
  }),
  new PurifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, 'src/*.html')),
    purifyOptions: {
      whitelist: ['show'],
    }
  })
],
};