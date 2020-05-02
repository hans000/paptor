const path = require("path")

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'paptor.js',
        library: {
            root: 'paptor',
            amd: 'paptor',
            commonjs: 'paptor'
        },
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            }
        ]
    }
}