/* global module require __dirname process */

var path = require("path");
var webpack = require("webpack");

function isPrepublish() {
  "use strict";
  return process.env.NODE_ENV === "prepublish";
}

module.exports = function() {
  "use strict";

  return {
    entry: {
      main: "./src/editor/main",
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },

    cache: true,
    debug: true,
    devtool: false,
    target: "web",

    devServer: {
      publicPath: "/assets/",
      headers: {
        "Cache-Control": "max-age=315360000"
      }
    },

    resolve: {
      modulesDirectories: [
        "src", "node_modules", "bower_components"
      ]
    },

    resolveLoader: { root: path.join(__dirname, "node_modules") },

    //     externals: {
      //       "jquery": "jQuery",
      //       "moment": "moment",
      //       "lodash": "_",
      //       "mousetrap": "Mousetrap",
      //       "codemirror": "CodeMirror",
      //       "xterm": "XTerm"
      //     },

      module: {
        preLoaders: [
          {
            test: /\.js$/,
            loader: "eslint-loader",
            exclude: /node_modules/
          }
        ],

        loaders: [{
          // test: /\.css$/,
          // loader: "style!css!autoprefixer-loader"
        // }, {
          // test: /\.less$/,
          // loader: "style!css!autoprefixer!less"
        // }, {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loaders: ["babel?stage=0"]
        }, {
          test: /\.(png|svg|woff|woff2|eot|ttf|otf)$/,
          loader: "url?limit=100000"
        }]
      }
  };
};
