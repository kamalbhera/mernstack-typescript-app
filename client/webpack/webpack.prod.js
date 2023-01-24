const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('prod'),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/locales/', to: 'locales/' },{ from: 'public/assets/', to: 'assets/' }],
      }),
  ],
};
