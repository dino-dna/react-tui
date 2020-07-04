// @info webpack for HMR demos via node, not for any type
// of web support ;)
const { resolve } = require("path");

const projectDirname = __dirname;
const debugLoggerFilename = resolve(
  projectDirname,
  "./scripts/webpack-hmr-log.js"
);

function createCommonWebpackConfig() {
  return {
    devtool: "source-map",
    devServer: {
      hot: true,
    },
    entry: [
      // "react-hot-loader/patch",
      "./node_modules/webpack/hot/poll?1000",
      "./examples/index.js",
    ],
    // resolve: {
    //   alias: {
    //     "react-dom": "@hot-loader/react-dom"
    //   },
    // },
    target: "node",
    mode: "development",
    externals: [require("webpack-node-externals")()],
    output: {
      filename: "[name].bundle.js",
      path: require("path").resolve(__dirname, "dist"),
    },
    optimization: {
      minimize: false,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: ["react-hot-loader/babel"],
            },
          },
        },
      ],
    },
  };
}

module.exports = createCommonWebpackConfig();
