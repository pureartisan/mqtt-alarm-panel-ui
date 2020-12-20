const path = require("path");
const nodeExternals = require('webpack-node-externals');

const packageJson = require('./package.json');

module.exports = {
  resolve: {
    alias: {
      '@electron': path.resolve(__dirname, './src/electron/app/'),
      '@shared': path.resolve(__dirname, './src/shared/')
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  devtool: "source-map",
  entry: "./src/electron/main.ts",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: "2",
                targets: {
                  'node': true
                }
              }],
              "@babel/preset-typescript"
            ]
          }
        },
      },
    ],
  },
  node: {
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  plugins: [
    new webpack.DefinePlugin({
      '__BUILD_INFO_PACKAGE_NAME__': JSON.stringify(packageJson.name),
      '__BUILD_INFO_PACKAGE_VERSION__': JSON.stringify(packageJson.version)
    })
  ],
  externals: [nodeExternals()]
};
