
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/public/dist');

module.exports = {
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
  plugins: [new HtmlWebpackPlugin({
    title: 'Well Traveled',
    template: 'index.html'
  })]
};