import webpack from "webpack";
import path from 'path';
import {RaguServerConfig} from "ragu-server";

const {VueLoaderPlugin} = require("vue-loader");

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

export const raguVueWebpackBaseConfig = (config: RaguServerConfig): webpack.Configuration => {
  return {
    mode: 'production',
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules')],
      extensions: [ '.js', '.vue', '.ts' ],
      alias: {
        'vue$': 'vue/dist/vue.runtime.min.js',
      }
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, '..', 'node_modules')],
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/,
          options: {
            optimizeSSR: true,
            extractCSS: true
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          exclude: /node_modules/,
          loader: 'file-loader',
          options: {
            esModule: false,
            publicPath: config.compiler.assetsPrefix
          },
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            config.environment === 'development' ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: config.environment === 'development' } },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            config.environment === 'development' ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: config.environment === 'development' } },
            { loader: 'sass-loader', options: { sourceMap: config.environment === 'development' } }
          ]
        },
        {
          test: /\.sass$/,
          exclude: /node_modules/,
          use: [
            config.environment === 'development' ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: config.environment === 'development' } },
            { loader: 'sass-loader', options: { sourceMap: config.environment === 'development' } }
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCSSExtractPlugin(),
    ]
  }
}
