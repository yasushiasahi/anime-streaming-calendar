const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader', 'stylelint-custom-processor-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Anime Streaming Calendar',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      favicon: 'src/favicon.ico'
    }),
    new webpack.NamedModulesPlugin()
  ]
}
