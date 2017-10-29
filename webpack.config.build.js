const {DefinePlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliWebpackPlugin = require('babili-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: false,
  entry: __dirname + '/src/components/authentication',
  output: {
    path: __dirname + '/dist',
    filename: 'authentication.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js', '.vue'],
    alias: {
      components: __dirname + '/src/components',
      decorators: __dirname + '/src/decorators',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
    }),
    new BabiliWebpackPlugin({
      removeConsole: true,
      removeDebugger: true,
    }),
  ],
};
