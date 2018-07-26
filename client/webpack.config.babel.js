const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "../dist"),
  },
  devServer: {
    contentBase: "../dist",
    open: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   enforce: "pre",
      //   use: [
      //     {
      //       loader: "tslint-loader",
      //     },
      //   ],
      // },
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader", "stylelint-custom-processor-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: [
          {
            loader: "source-map-loader",
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "アニメ ストリーミング カレンダー",
      meta: { viewport: "width=device-width, initial-scale=1, shrink-to-fit=no" },
      favicon: "src/favicon.ico",
    }),
    new webpack.NamedModulesPlugin(),
  ],
}
