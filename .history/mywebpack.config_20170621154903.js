var webpack = require('webpack');

module.exports = [
    {
      entry: './src/index.js',
      output: {
        filename: 'dist/bundle.js'
      },
      module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader?importLoaders=1',
                  'postcss-loader'
                ]
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?path=dist&hash=sha512&digest=hex&name=images/[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
              },
              {
                test: /\.html$/,
                use : [
                  'html-loader?minimize=true'
                ]
              }
            ]
          }
    }
]
