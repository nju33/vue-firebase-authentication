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
      // https://jp.vuejs.org/v2/guide/installation.html#Webpack
      vue$: 'vue/dist/vue.esm.js',
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
      // {
      //   test: /vue-spinner.*\.vue$/,
      //   use: [
      //     {
      //       loader: 'vue-loader',
      //     },
      //   ],
      // },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader?exportAsEs6Default',
          },
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'less-loader',
      //     },
      //   ],
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // https://medium.com/netscape/firebase-cloud-functions-with-typescript-and-webpack-7781c882a05b#9745
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
