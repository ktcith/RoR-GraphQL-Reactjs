/* eslint no-var: 0 */
/* eslint max-len: 0 */

var dotenv = require('dotenv');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

dotenv.config();

module.exports = {
  entry: {
    client: ['babel-polyfill', path.join(__dirname, 'app', 'client', 'app.js')],
  },
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!resolve-url-loader!sass-loader?outputStyle=expanded&sourceMap',
        }),
        exclude: /node_modules/,
      },
      {
        test: /\.iscss$/,
        loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!resolve-url-loader!sass-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    modules: [path.join(__dirname, 'app', 'client', 'modules'), 'node_modules'],
    extensions: ['.js', '.jsx', '.scss', '.css', '.iscss'],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '../stylesheets/app.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SENTRY_PUBLIC_DSN: JSON.stringify(process.env.SENTRY_PUBLIC_DSN),
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('autoprefixer')],
      },
    }),
  ],
};
