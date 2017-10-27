const {DefinePlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'web',
  devtool: 'eval-source-map',
  entry: __dirname + '/src/index.ts',
  output: {
    path: __dirname + '/tmp',
    filename: 'authentication.js',
  },
  resolve: {
    extensions: ['.ts', '.json', '.js', '.vue'],
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
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
      },
      {
        // test: /^vue-spinner\/.+\.vue$/,
        // test: /\.vue$/,
        test: /vue-spinner.*\.vue$/,
        // exclude: /node_modules(?!\/vue-spinner)/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader?exportAsEs6Default',
          },
        ],
      },
    ],
  },
  plugins: [
    // https://medium.com/netscape/firebase-cloud-functions-with-typescript-and-webpack-7781c882a05b#9745
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + '/dev.html',
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  // externals: [
  //   nodeExternals(),
  // ],
};
