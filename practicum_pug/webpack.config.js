const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  
  // Убедитесь, что entry существует
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js', // Используем [name] вместо фиксированного имени
    clean: true
  },
  
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9001,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true
  },
  
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.pug',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/ruslan.pug',
      filename: 'ruslan.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/table.pug',
      filename: 'table.html',
    })
  ],
  
};