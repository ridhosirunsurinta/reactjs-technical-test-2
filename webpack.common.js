const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    frontend: { import: "./src/index.js", dependOn: "frontend-vendors" },
    "frontend-vendors": [
      // Vendors splitting
      "react",
      "react-dom",
      "react-redux",
      "@reduxjs/toolkit",
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "axios",
      "lodash",
      "luxon",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Support .js and .jsx
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react", // Don't have to 'import React from 'react'; on top of your component'
    }),
    new HtmlWebpackPlugin({
      title: "Reactjs Technical Test 2",
      template: "public/index.html",
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // Include frontend-vendors to the index.html
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"), // After build the dist folder will created
    filename: "[name].bundle.js",
    clean: true,
  },
};
