const path = require("path")

module.exports = {
  mode: 'development', // development production
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'paptor.js',
    library: {
      root: 'paptor',
      amd: 'paptor',
      commonjs: 'paptor'
    },
    libraryTarget: 'umd',
  }
}