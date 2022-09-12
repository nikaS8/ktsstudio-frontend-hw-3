const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';
const getSettingsForStyles = (withModules = false) => {
    return [MiniCssExtractPlugin.loader, !withModules ? 'css-loader': {
      loader: 'css-loader',
        options: {
          modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
          }
        }
    },{
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: ['autoprefixer']
            }
        }
    }, 'sass-loader']
}

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: isProd ? 'browserslist' : 'web',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html')
        }),
        !isProd && new ReactRefreshPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new TsCheckerPlugin(),
        new Dotenv(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                }
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
        alias: ({
            '@config': path.join(srcPath, 'config/'),
            '@pages': path.join(srcPath, 'pages/'),
            '@img': path.join(srcPath, 'assets/img/'),
            '@components': path.join(srcPath, 'components/'),
            '@styles': path.join(srcPath, 'styles/'),
            '@myTypes': path.join(srcPath, 'myTypes/'),
            '@store': path.join(srcPath, 'store/'),
            '@RecipesCardsPage': path.join(srcPath, 'pages/MenuPage/'),
            '@DetailRecipePage': path.join(srcPath, 'pages/DetailRecipePage/'),
            '@utils': path.join(srcPath, 'utils'),
        })
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true
    }
}