const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
     path: path.resolve(__dirname, "public"),
     filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
