'user strict';

const devMode = process.env.NODE_ENV !== 'production'

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    bundle: path.join(__dirname, './client/routes.js')
  },
  output: {
    path: path.resolve(__dirname, './server/static/build'),
    publicPath: "/static/build/",
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, './client'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, './client'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: {
          loader: 'url-loader?name=[name]@[hash].[ext]&limit=5000'
        }
      }
    ]
},
plugins: [
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
],
resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      '#components': path.join(__dirname, './client/components'),
      '#containers': path.join(__dirname, './client/containers')
    }
},
watch: true
};
