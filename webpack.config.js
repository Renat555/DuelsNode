const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

function optimization() {
  let config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()];
  }

  return config;
}

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    socketCleint: "./scripts/game/socketClient",
    hasGameStarted: "./scripts/game/hasGameStarted",
    createSpells: "./scripts/game/createSpells",
    createHero: "./scripts/createHero/createHero",
    help: "./scripts/help/help.js",
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".css"],
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    historyApiFallback: {
      index: "/createHero.html",
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "game.html",
      template: "./pages/game.html",
      chunks: ["socketClient", "createSpells", "hasGameStarted"],
      collapseWhitespace: isProd,
    }),
    new HTMLWebpackPlugin({
      filename: "createHero.html",
      template: "./pages/createHero.html",
      chunks: ["createHero"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new HTMLWebpackPlugin({
      filename: "help.html",
      template: "./pages/help.html",
      chunks: ["help"],
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(
            __dirname,
            "src/scripts/bootstrap/bootstrap.min.js"
          ),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/css/bootstrap/bootstrap.min.css"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/audio"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif|mp3)$/,
        use: ["file-loader"],
      },
    ],
  },
};
