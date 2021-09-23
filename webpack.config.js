const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { classNameTemplate } = require("./build");

const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProductionMode ? "production" : "development",
  entry: {
    app: "./src/client/index.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "/static/dist/",
  },
  resolve: {
    // Здесь только расширения, алиасами рулит бабель
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".styl"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "babel-loader",
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/static/dist/",
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: classNameTemplate,
                // context: path.resolve(__dirname, 'src'),
                // hashPrefix: 'my-custom-hash',
              },
            },
          },
          {
            loader: "stylus-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
