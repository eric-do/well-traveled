
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
var path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = () => {
 // call dotenv and it will return an Object with a parsed key 
 const env = dotenv.config().parsed;
  
 // reduce it to a nice object, the same as before
 const envKeys = Object.keys(env).reduce((prev, next) => {
   prev[`process.env.${next}`] = JSON.stringify(env[next]);
   return prev;
  }, {});

  return {
  entry: `${SRC_DIR}/index.js`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Well Traveled',
      template: 'index.html'
    }),
    new webpack.DefinePlugin(envKeys)
  ]
}
};