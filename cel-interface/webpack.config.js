const path = require("path")
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")

const SRC_DIR = path.join(__dirname, "src/")
const ASSET_PATH = "assets/"
const DIST_DIR = path.resolve(__dirname, "dist")

module.exports = {
  entry: {
    bundle: `${SRC_DIR}index.tsx`,
  },
  output: {
    filename: "public/[name].js",
    path: DIST_DIR,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              [
                "import",
                {
                  libraryName: "@material-ui/core",
                  libraryDirectory: "",
                  camel2DashComponentName: false,
                },
              ],
            ],
          },
        },
        exclude: /node-modules/,
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        use: [{ loader: "source-map-loader" }],
      },
    ],
  },
  plugins: [
    // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: "all",
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
}
