const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var env = "development";
if (process.env.NODE_ENV === "production") {
  env = "production";
}
console.log(env)
const path = require('path');

const browserConfig = {
  entry: "./src/browser/index.js",
  output: {
    publicPath: '/',
    filename: '../public/resources/js/bundle.js' //minify olması için development yerine production
  },
  mode: env,
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "../public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test:/\.(s*)css$/, 
        use: ExtractTextPlugin.extract({ 
                fallback:'style-loader',
                use: [
                  { 
                    loader: 'css-loader', options: { minimize: true } 
                  },
                  'sass-loader'
                 ],
            })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      },
      {
        test: /\.font\.js/,
        use: [
          'only-web-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'webfonts-loader'
        ]
      },
      {
        loader: "url-loader",
        test: /\.(svg|eot|ttf|woff|woff2)?$/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../src/components/scss/templates/fonts.scss'
    }),
    new ExtractTextPlugin({
      filename: "../public/resources/css/[name].css",
   
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = true;",
      raw: true,
      include: /\.js$/
    })
  ]
};

const serverConfig = {
  entry: "./src/server/index.js",
  target: "node",
  output: {
    path: __dirname,
    filename: "server.js",
    libraryTarget: "commonjs2"
  },
  mode:env,
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: [/\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },
      {
        test:/\.(s*)css$/, 
        use: ExtractTextPlugin.extract({ 
                fallback:'style-loader',
                use: [
                  { 
                    loader: 'css-loader', options: { minimize: true } 
                  },
                  'sass-loader'
                 ],
            })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      },

    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "../public/resources/css/[name].css",
    }),
    new webpack.BannerPlugin({
      banner: "__isBrowser__ = false;",
      raw: true,
      include: /\.js$/
    })
  ]
};

module.exports = [browserConfig, serverConfig];
