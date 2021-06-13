const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  target: "web",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x$/,
        // exclulde: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            // type: "src/img",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
};
