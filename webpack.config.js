var path = require('path');
var webpack = require('webpack');
var config = {
   devtool : 'cheap-module-source-map',
   entry:{bundle:'./src/main/js/main.js',
   'vendor-bundle': ['react','react-dom']
 },
   output: {
      path:'/home/exo/react-portlet/target/react-portlet/js',
      filename: 'index.js'
   },
   devServer: {
      inline: true,
      port: 8080
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
plugins:[
   new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor-bundle',
      filename: 'vendor-bundle.js',
      minChunks: Infinity
    })
  ]
}
module.exports = config;
