const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    const config = {
        entry: {
            editor: './src/editor.js',
            script: './src/script.js',
        },
        output: {
            'filename': '[name].js',
            path: path.resolve(process.cwd(), 'dist'),
        },
        devtool: isDev ? 'cheap-module-source-map' : 'source-map',
        mode: 'development',
        plugins: [
            new CleanWebpackPlugin({
                verbose: true
            }),
            new MiniCssExtractPlugin({
                filename: pathData => {
                    return pathData.chunk.name === 'script' ? 'style.css':'[name].css';
                }
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(sc|sa|c)ss/,
                    exclude: '/node_modules/',
                    use: [
                        //'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    [
                                        '@babel/preset-react', {
                                            "pragma": "wp.element.createElement",
                                            "pragmaFrag": "wp.element.Fragment",
                                            "development": isDev 
                                        }
                                    ]
                                ]
                            }                    
                        },
                        'eslint-loader'
                    ]
                }
            ]   
        },
        externals: {
            jquery: 'jQuery',
            '@wordpress/blocks': ["wp", "blocks"],
            '@wordpress/i18n': ["wp", "i18n"],
        },
        optimization: {
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                // `...`,
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
        },
    };

    return config;
}