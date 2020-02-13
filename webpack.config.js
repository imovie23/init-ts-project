const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = !isDevelopment

// minimizes build production files
const optimizationFile = () => {
  const config = {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },

    },
  }

  if (isProduction) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }
  return config
}

// hashing file names
const fileName = (ext) => ( isDevelopment ? `[name].${ ext }` : `[name].[hash].${ ext }` )

// minimizes build production files css/ sass/ less
const cssLoaders = (ext) => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDevelopment,
      reloadAll: true,
    },
  },
    'css-loader',
  ]

  if (ext) {
    loaders.push(ext)
  }
  return loaders
}


const babelOptions = (preset) => {
  const options = {
    presets: [
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ],
  }

  if (preset) {
    options.presets.push(preset)
  }

  return options
}

const jsBabelLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  },
    'ts-loader'
  ]

  if (isDevelopment) {
    loaders.push('eslint-loader')

  }
  return loaders
}

const plugins = () => {
  const base = [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ]

  // if(isProduction){
  //   base.push(new BundleAnalyzerPlugin())
  // }

  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.ts'],

  },
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  optimization: optimizationFile(),
  devServer: {
    port: 3001,
    hot: isDevelopment,

  },
  devtool: isDevelopment ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // babel
        use: jsBabelLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/, // babel
        use: jsBabelLoaders('@babel/preset-typescript'),
      },
    ],
  },
}
