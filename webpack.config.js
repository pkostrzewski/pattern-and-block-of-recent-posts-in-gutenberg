const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js', // Main JS file
        BlockLatestPosts: ['./src/js/blocks/latest-posts.js','./src/scss/blocks/latest-posts.scss'] // Separate SCSS file to be processed
      },
  output: {
    path: path.resolve(__dirname, 'build'), // Output folder
    filename: '[name].js', // Output JS file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // Handling JavaScript and TypeScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.svg$/, // Handling SVG files
        use: [
          {
            loader: '@svgr/webpack', // Converting SVG to React components
          },
          {
            loader: 'url-loader', // Converting SVG to URL
            options: {
              limit: 8192, // Limit to 8KB
            },
          },
        ],
      },
      {
        test: /\.(css|scss|sass)$/, // Handling CSS, SASS, and SCSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to a separate file
          'css-loader', // Process CSS
          'postcss-loader', // Process CSS with PostCSS
          'sass-loader', // Process SASS/SCSS
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // CSS file name
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: '**/*.json', to: './', context: 'src' }, // Copy block.json files
      ],
    }),
    new DependencyExtractionWebpackPlugin(), // Ensuring WordPress scripts are not bundled
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Extensions to resolve
  },
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      new TerserWebpackPlugin(), // Minify JS
      new CssMinimizerPlugin(), // Minify CSS
    ],
  },
  mode: 'production', // Set mode to 'production' for minification
};