const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
    const isDevelopment = argv.mode !== 'production'
    const outputDir = path.join(__dirname, 'dist')

    return {
        entry: './index.ts',
        //mode: isDevelopment ? "development" : 'production',
        output: {
            filename: 'engine.bundle.js',
            path: outputDir,
            // libraryTarget: 'umd',
            // library: 'mylernalibrary'
        },
        // externals: {
        //     '@my-lerna-library/common': '@my-lerna-library/common'
        // },
        resolve: {
            extensions: ['.tsx', '.ts', '.js','.scss','.svg'],
            plugins: [
                new TsconfigPathsPlugin({baseUrl:'.'})//precisa disso. Só o paths no tsconfig nao adianta.
            ]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,//required for ForkTsCheckerWebpackPlugin
                        }
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.module\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                import: false,
                                modules: true
                            }
                        }
                    ],
                    include: /\.module\.css$/
                },
                {
                    test: /\.module\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader"
                        },
                        "sass-loader"
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module.(s(a|c)ss)$/,
                    use: [
                        "style-loader",// Creates `style` nodes from JS strings
                        "css-loader",// Translates CSS into CommonJS
                        "sass-loader",// Compiles Sass to CSS
                    ],
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: [outputDir]}),
            new ForkTsCheckerWebpackPlugin(),//used to compile ts faster
            new MiniCssExtractPlugin({
                filename: isDevelopment ? '[name].css' : '[name].[hash].css',
                chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
            }),
        ]
    }
}


