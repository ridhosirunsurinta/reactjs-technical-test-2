const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true, // Reload Automatically
    port: 3000, // PORT
    https: false,
    compress: true,
    client: {
      logging: "none", // I don't need for now
    },
  },
  module: {
    rules: [
      {
        test: /.(css|scss|sass)$/i, // Support CSS, SCSS, SASS
        use: [
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
});
