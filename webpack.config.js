const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  devtool: 'source-map',
  optimization: {
    usedExports: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 
          'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // This plugin extracKts CSS into separate files. It creates a CSS file per JS file which contains CSS.
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    // A webpack plugin to remove/clean your build folder(s).
    new CleanWebpackPlugin(),
    // A webpack plugin to generate HTML files to serve your webpack bundles.
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    // Webpack plugin that runs TypeScript type checker on a separate process.
    new ForkTsCheckerWebpackPlugin(),
    // ESLint
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
      context: 'src',
    }),
    // Copies individual files or entire directories, which already exist, to the build directory.
    new CopyPlugin({
      patterns: [
        { 
          from: 'src/assets', 
          to: 'assets', 
          noErrorOnMissing: true 
        },
      ],
    }),
  ]
};