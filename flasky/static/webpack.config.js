const webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  output: {
      filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
}