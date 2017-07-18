const webpack = require('webpack')
const pkg = require('./package')

module.exports = {
  entry: {
    'lucid': './src/index.js',
    'lucid.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/
    }),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${pkg.version}\n\n@author ${pkg.author}\n@license ${pkg.license}`,
      raw: false,
      entryOnly: true
    })
  ]
}
