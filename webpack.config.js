process.traceDeprecation = true;

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: {
    'main.js': path.resolve(__dirname, 'src/index.js')
  },
  output: {
    filename: '[name]',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|eot|otf|svg|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico'
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};