const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

const packageJson = require('./package.json');

const buildPluginsList = () => {
  const plugins = [];

  plugins.push(
    new HtmlWebpackPlugin()
  );

  plugins.push(
    new webpack.DefinePlugin({
      '__BUILD_INFO_ENV__': JSON.stringify(process.env.NODE_ENV),
      '__BUILD_INFO_PACKAGE_NAME__': JSON.stringify(packageJson.name),
      '__BUILD_INFO_PACKAGE_VERSION__': JSON.stringify(packageJson.version)
    })
  );

  if (!IS_DEV) {

    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'bundle.css',
        chunkFilename: '[id].css'
      })
    );

    plugins.push(
      new MinifyPlugin()
    );

  }

  return plugins;
};

module.exports = {
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
    },
    extensions: [".tsx", ".ts", ".js"],
    mainFields: ["main", "module", "browser"],
  },
  entry: "./src/app/index.tsx",
  target: "electron-renderer",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            // {
            //   loader: 'postcss-loader',
            //   options: {
            //     sourceMap: true,
            //     postcssOptions: {
            //       config: path.resolve(__dirname, "postcss.config.js")
            //     }
            //   }
            // },
            {
              loader: 'sass-loader', options: { sourceMap: true }
            }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        exclude: /node_modules/,
      },
      {
        test: /\.(mp3)$/,
        use: [{ loader: 'file-loader?name=mp3/[name]__[hash:base64:5].[ext]' }],
        exclude: /node_modules/,
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "../build/renderer"),
    historyApiFallback: true,
    compress: true,
    hot: true,
    port: 4000,
    publicPath: "/",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].js",
  },
  plugins: buildPluginsList()
};
