const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const env = process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'

const mode = 'none'
const watch = (env === 'dev')

const clientConfig = {
    mode,
    watch,
    target: 'web',
    entry: {
        index: path.join(__dirname, 'src/client/index.ts'),
        serviceworker: path.join(__dirname, 'src/serviceworker/index.ts')
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist/static/js")
    },
    externals: [
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin(),
            // new webpack.DefinePlugin({
            //    'process.browser': 'true',
            // })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
    ]
}

const serverConfig = {
    mode,
    watch,
    target: 'node',
    entry: {
        index: path.join(__dirname, 'src/server/index.ts'),
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist")
    },
    externals: [
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        plugins: [
            new TsconfigPathsPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "src/server/views", to: "views", toType: "dir" }
            // { from: "package.json", to: "package.json", toType: "file" },
        ]),
    ]
}


module.exports = [
    clientConfig,
    serverConfig,
]
