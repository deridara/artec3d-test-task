const path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },

      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: "style-loader"
          }, // creates style nodes from JS strings},
          {
            loader: "css-loader"
          }, // translates CSS into CommonJS
          {
            loader: "sass-loader"
          } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  devServer: { contentBase: "./dist", port: 3000, historyApiFallback: true }
};
